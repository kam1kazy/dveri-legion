'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const MODEL_PATH = '/model/door/scene.gltf';

const isMesh = (object: THREE.Object3D): object is THREE.Mesh =>
  (object as THREE.Mesh).isMesh === true;

const applyOpaqueMaterials = (object: THREE.Object3D) => {
  if (!isMesh(object)) {
    return;
  }

  const materials = Array.isArray(object.material) ? object.material : [object.material];
  materials.forEach((material) => {
    material.transparent = false;
    material.opacity = 1;
  });
};

const frameObject = (object: THREE.Object3D, camera: THREE.PerspectiveCamera, offset = 1.45) => {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  object.position.sub(center);

  const maxSize = Math.max(size.x, size.y, size.z);
  const fitHeightDistance = maxSize / (2 * Math.tan((Math.PI * camera.fov) / 360));
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = offset * Math.max(fitHeightDistance, fitWidthDistance);

  camera.position.set(0, 0, distance);
  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();
};

interface IDoorScene {
  className?: string;
}

export const DoorScene = ({ className }: IDoorScene) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const base = new THREE.Object3D();
    scene.add(base);

    const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
    camera.position.z = 2.1;
    scene.add(camera);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x1a1a1a, 0.8);
    scene.add(hemisphereLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(2, 3, 4);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 8, 12);
    pointLight.position.set(0, 0.4, 2);
    scene.add(pointLight);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const loader = new GLTFLoader();
    let disposed = false;
    let framed = false;

    const setSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) {
        return;
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    loader.load(
      MODEL_PATH,
      (gltf) => {
        if (disposed) {
          return;
        }

        gltf.scene.traverse(applyOpaqueMaterials);
        base.add(gltf.scene);
        setSize();
        frameObject(gltf.scene, camera);
        pointLight.position.z = camera.position.z * 0.45;
        framed = true;
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    const mouse = new THREE.Vector2();
    const lookTarget = new THREE.Vector3(0, 0, 1.4);
    const lookCurrent = new THREE.Vector3(0, 0, 1.4);

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      pointLight.position.x = mouse.x * 2.2;
      pointLight.position.y = mouse.y * 1.8;

      lookTarget.set(mouse.x * 0.55, mouse.y * 0.35, 1.4);
    };

    setSize();

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);
    window.addEventListener('mousemove', onMouseMove);

    renderer.setAnimationLoop(() => {
      if (framed) {
        lookCurrent.lerp(lookTarget, 0.08);
        base.lookAt(lookCurrent);
      }

      renderer.render(scene, camera);
    });

    return () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      canvas.remove();

      scene.traverse((object) => {
        if (!isMesh(object)) {
          return;
        }

        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      });
    };
  }, []);

  return <div ref={containerRef} className={className} />;
};
