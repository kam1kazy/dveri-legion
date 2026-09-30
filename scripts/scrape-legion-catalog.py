#!/usr/bin/env python3
"""Export Legion doors for apartment / house categories into the local catalog."""

from __future__ import annotations

import html
import json
import re
import ssl
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "src" / "entities" / "door" / "data"
# Поля, которых достаточно для листинга и фильтров. Полный файл с
# характеристиками и галереей грузится только на странице товара.
LITE_FIELDS = {
    "id",
    "slug",
    "name",
    "series",
    "price",
    "currency",
    "categories",
    "sectionIds",
    "sections",
    "features",
    "placement",
    "priceTier",
    "flags",
    "previewText",
}
IMG_DIR = ROOT / "public" / "catalog" / "doors"
BASE = "https://legion-doors.ru"
API = (
    f"{BASE}/api/products/"
    "?mode=class&controller=legionutils.productApi"
    "&action=legionutils.productApi.getProductsAndFilters"
)
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
CTX = ssl.create_default_context()

APARTMENT_ID = 87
HOUSE_ID = 61
SERIES_RE = re.compile(
    r"^(Legion(?:\s+(?:Arctic|Nordic|Ultima|Prime|Smart|Pro|Classic|Fire|Steel)"
    r"(?:\s+(?:Plus|Steel|Pro|Glass(?:\s+Plus)?))?)?)",
    re.I,
)


def request(url: str, data: bytes | None = None, timeout: int = 40) -> bytes:
    headers = {"User-Agent": UA, "Accept": "*/*"}
    if data is not None:
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(
        url,
        data=data,
        headers=headers,
        method="POST" if data is not None else "GET",
    )
    with urllib.request.urlopen(req, timeout=timeout, context=CTX) as res:
        return res.read()


def fetch_json(url: str, payload: dict | None = None) -> dict:
    raw = request(url, json.dumps(payload or {}).encode("utf-8"))
    return json.loads(raw.decode("utf-8"))


def option_map(items: list) -> dict[str, dict]:
    out: dict[str, dict] = {}
    for item in items or []:
        oid = str(item.get("id") or item.get("ID") or "")
        if not oid:
            continue
        out[oid] = {
            "id": oid,
            "label": item.get("label") or item.get("NAME") or "",
            "slug": item.get("slug") or item.get("CODE") or "",
        }
    return out


def labels_for(ids, mapping: dict[str, dict]) -> list[str]:
    result = []
    for raw in ids or []:
        item = mapping.get(str(raw))
        if item and item["label"]:
            result.append(item["label"])
    return result


def parse_series(name: str) -> str:
    match = SERIES_RE.match(name or "")
    if match:
        return " ".join(match.group(1).split())
    parts = (name or "").split()
    return " ".join(parts[:2]) if len(parts) >= 2 else (name or "")


def parse_spec_value(raw):
    if raw in (None, "", [], {}):
        return None
    if isinstance(raw, dict) and "value" in raw:
        value = html.unescape(str(raw.get("value") or "")).strip()
        name = raw.get("name") or ""
        if not value:
            return None
        if value.startswith("{") and value.endswith("}"):
            try:
                parsed = json.loads(value)
                cleaned = {}
                for key, val in parsed.items():
                    cleaned[str(key).strip(" :\"'")] = html.unescape(str(val)).strip()
                return {"name": name, "pairs": cleaned}
            except json.JSONDecodeError:
                pass
        return {"name": name, "value": value}
    if isinstance(raw, str) and raw.strip():
        return {"name": "", "value": html.unescape(raw).strip()}
    return None


def clean_specs(specs: dict | None) -> list[dict]:
    groups = []
    for key, raw in (specs or {}).items():
        parsed = parse_spec_value(raw)
        if not parsed:
            continue
        parsed["key"] = key
        groups.append(parsed)
    return groups


def abs_url(path: str | None) -> str | None:
    if not path:
        return None
    if path.startswith("http"):
        return path
    return BASE + path


def ext_from_url(url: str) -> str:
    suffix = Path(url.split("?")[0]).suffix.lower()
    return suffix if suffix in {".webp", ".jpg", ".jpeg", ".png"} else ".webp"


def download_image(url: str, dest: Path) -> bool:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 0:
        return True
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=40, context=CTX) as res:
            dest.write_bytes(res.read())
        return dest.stat().st_size > 0
    except (urllib.error.URLError, TimeoutError, ssl.SSLError):
        return False


def extract_detail(html_text: str) -> dict | None:
    match = re.search(r'data-product="([^"]*)"', html_text)
    if not match:
        return None
    try:
        return json.loads(html.unescape(match.group(1)))
    except json.JSONDecodeError:
        return None


def fetch_detail(url: str) -> dict | None:
    try:
        raw = request(url, data=None)
        return extract_detail(raw.decode("utf-8", errors="ignore"))
    except (urllib.error.URLError, TimeoutError, ssl.SSLError):
        return None


def derive_flags(name: str, features: list[str], sections: list[int]) -> list[str]:
    blob = f"{name} {' '.join(features)}".lower()
    flags = []
    if APARTMENT_ID in sections:
        flags.append("apartment")
    if HOUSE_ID in sections:
        flags.append("house")
    if "зеркал" in blob or 56 in sections:
        flags.append("mirror")
    if "терморазр" in blob or 62 in sections:
        flags.append("thermalBreak")
    if any(word in blob for word in ("электрон", "биометр", "xiaomi")) or 74 in sections:
        flags.append("electronicLock")
    if "скрыт" in blob and "петл" in blob:
        flags.append("hiddenHinges")
    return flags


def normalize_item(item: dict, maps: dict[str, dict[str, dict]]) -> dict:
    sections = [int(x) for x in (item.get("SECTIONS") or [])]
    props = item.get("PROPERTIES") or {}
    if not isinstance(props, dict):
        props = {}
    features = labels_for(props.get("FEATUREMENT"), maps["FEATUREMENT"])
    name = item.get("NAME") or item.get("name") or ""
    price_raw = item.get("price")
    price = int(price_raw) if str(price_raw).isdigit() else None
    return {
        "id": str(item.get("ID")),
        "slug": item.get("CODE"),
        "name": name,
        "series": parse_series(name),
        "price": price,
        "currency": item.get("currencyCode") or "₽",
        "sourceUrl": abs_url(item.get("urlDetail")),
        "categories": {
            "apartment": APARTMENT_ID in sections,
            "house": HOUSE_ID in sections,
        },
        "sectionIds": sections,
        "sections": labels_for(sections, maps["SECTION"]),
        "features": features,
        "placement": labels_for(props.get("PLACEMENT"), maps["PLACEMENT"]),
        "priceTier": labels_for(props.get("PRICEMENT"), maps["PRICEMENT"]),
        "flags": derive_flags(name, features, sections),
        "previewText": None,
        "specs": [],
        "images": {
            "outerRemote": abs_url(item.get("imgSrc")),
            "innerRemote": abs_url(item.get("imgInner")),
            "galleryRemote": [],
            "outer": None,
            "inner": None,
            "gallery": [],
        },
    }


def main() -> int:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    out_path = DATA_DIR / "doors.json"

    print("Fetching catalog API…")
    payload = fetch_json(API, {})
    data = payload.get("data") or {}
    options = data.get("options") or {}
    maps = {
        "SECTION": option_map(options.get("SECTION")),
        "FEATUREMENT": option_map(options.get("FEATUREMENT")),
        "PLACEMENT": option_map(options.get("PLACEMENT")),
        "PRICEMENT": option_map(options.get("PRICEMENT")),
    }

    items = [normalize_item(item, maps) for item in data.get("items") or []]

    items.sort(key=lambda x: (x["price"] is None, x["price"] or 0, x["name"]))
    print(f"Matched {len(items)} doors (full catalog)")

    catalog = {
        "source": BASE,
        "exportedAt": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "categories": [
            {"id": "apartment", "label": "В квартиру", "sectionId": APARTMENT_ID},
            {"id": "house", "label": "В дом", "sectionId": HOUSE_ID},
        ],
        "options": {
            "sections": sorted(maps["SECTION"].values(), key=lambda o: o["label"]),
            "placement": sorted(maps["PLACEMENT"].values(), key=lambda o: o["label"]),
            "features": sorted(maps["FEATUREMENT"].values(), key=lambda o: o["label"]),
            "priceTier": sorted(maps["PRICEMENT"].values(), key=lambda o: o["label"]),
        },
        "filters": {
            "features": sorted({f for item in items for f in item["features"]}),
            "flags": [
                {"id": "mirror", "label": "С зеркалом"},
                {"id": "thermalBreak", "label": "С терморазрывом"},
                {"id": "electronicLock", "label": "Электронный замок"},
                {"id": "hiddenHinges", "label": "Скрытые петли"},
            ],
        },
        "items": items,
    }
    out_path.write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8")

    print("Scraping product pages…")
    by_id = {item["id"]: item for item in items}

    def load_detail(item: dict):
        if not item.get("sourceUrl"):
            return item["id"], None
        return item["id"], fetch_detail(item["sourceUrl"])

    done = 0
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(load_detail, item) for item in items]
        for future in as_completed(futures):
            item_id, detail = future.result()
            done += 1
            if done % 25 == 0 or done == len(items):
                print(f"  details {done}/{len(items)}")
            if not detail:
                continue
            target = by_id[item_id]
            target["previewText"] = (detail.get("preview_text") or "").strip() or None
            target["specs"] = clean_specs(detail.get("specs"))
            gallery = [abs_url(src) for src in (detail.get("images") or []) if src]
            target["images"]["galleryRemote"] = gallery
            if detail.get("price") and not target["price"]:
                price = str(detail["price"])
                if price.isdigit():
                    target["price"] = int(price)

    out_path.write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8")

    jobs: list[tuple[str, str, Path, str]] = []
    for item in items:
        images = item["images"]
        if images.get("outerRemote"):
            dest = IMG_DIR / f"{item['id']}-outer{ext_from_url(images['outerRemote'])}"
            jobs.append((item["id"], "outer", dest, images["outerRemote"]))
        if images.get("innerRemote"):
            dest = IMG_DIR / f"{item['id']}-inner{ext_from_url(images['innerRemote'])}"
            jobs.append((item["id"], "inner", dest, images["innerRemote"]))
        for index, url in enumerate(images.get("galleryRemote") or []):
            dest = IMG_DIR / f"{item['id']}-g{index}{ext_from_url(url)}"
            jobs.append((item["id"], f"g{index}", dest, url))

    print(f"Downloading {len(jobs)} images…")
    saved = 0
    with ThreadPoolExecutor(max_workers=12) as pool:
        future_map = {
            pool.submit(download_image, url, dest): (item_id, kind, dest)
            for item_id, kind, dest, url in jobs
        }
        for future in as_completed(future_map):
            item_id, kind, dest = future_map[future]
            ok = future.result()
            if not ok:
                continue
            saved += 1
            public_path = f"/catalog/doors/{dest.name}"
            images = by_id[item_id]["images"]
            if kind == "outer":
                images["outer"] = public_path
            elif kind == "inner":
                images["inner"] = public_path
            else:
                images["gallery"].append(public_path)
            if saved % 50 == 0:
                print(f"  images {saved}/{len(jobs)}")

    for item in items:
        item["images"]["gallery"] = sorted(set(item["images"]["gallery"]))

    prices = [item["price"] for item in items if item["price"]]
    catalog["stats"] = {
        "total": len(items),
        "apartment": sum(1 for item in items if item["categories"]["apartment"]),
        "house": sum(1 for item in items if item["categories"]["house"]),
        "withPrice": len(prices),
        "minPrice": min(prices) if prices else None,
        "maxPrice": max(prices) if prices else None,
        "imagesSaved": saved,
    }
    out_path.write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8")

    lite_items = []
    for item in items:
        lite = {key: value for key, value in item.items() if key in LITE_FIELDS}
        lite["images"] = {
            "outer": item["images"]["outer"],
            "inner": item["images"]["inner"],
            "outerRemote": item["images"]["outerRemote"],
            "innerRemote": item["images"]["innerRemote"],
        }
        lite_items.append(lite)

    lite_path = DATA_DIR / "doors-lite.json"
    lite_path.write_text(
        json.dumps({**catalog, "items": lite_items}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(json.dumps(catalog["stats"], ensure_ascii=False, indent=2))
    print(f"Wrote {out_path}")
    print(f"Wrote {lite_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
