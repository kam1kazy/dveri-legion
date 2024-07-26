// Меняет курсор и перекрашивает в зависимости от яркости фона

//? Меняем курсор и задаем границы
document.body.style.cursor = 'none'
const cursor = document.querySelector('.cursor')
const cursorBorder = document.querySelector('.cursor-border')

const cursorPos = new THREE.Vector2()
const cursorBorderPos = new THREE.Vector2()

//! HLS to RGBA
function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

//! Функция для получения цвета фона элемента в HSL
function getBackgroundColorHSL(element) {
  const bgColor = window.getComputedStyle(element).backgroundColor

  // Проверяем, задан ли цвет в формате HSL
  if (bgColor.startsWith('hsl')) {
    const hslValues = bgColor.match(/\d+/g)
    if (hslValues) {
      return {
        h: parseInt(hslValues[0]),
        s: parseInt(hslValues[1]),
        l: parseInt(hslValues[2]),
      }
    }
  }
  // Если цвет в формате RGB или RGBA
  else if (bgColor.startsWith('rgb')) {
    const rgbValues = bgColor.match(/\d+/g)
    if (rgbValues) {
      const r = parseInt(rgbValues[0])
      const g = parseInt(rgbValues[1])
      const b = parseInt(rgbValues[2])
      return rgbToHsl(r, g, b) // Преобразуем RGB в HSL
    }
  }

  // Если цвет не в распознаваемом формате
  return console.error('Формат цветовой палитры не распознан! Придерживайтесь формата HLS или RGBA')
}

//! Меняем цвет курсора
function changeColor(targetElement) {
  // Получаем цвет фона в HSL
  const hslColor = getBackgroundColorHSL(targetElement)

  if (hslColor) {
    const lightness = hslColor.l // Получаем значение светлоты
    console.log(lightness)

    // Устанавливаем порог для определения темного или светлого фона
    const threshold = 80 // Примерный порог для светлоты (0-100)

    if (lightness < threshold && lightness != 0) {
      // Если фон темный, курсор темный
      cursor.classList.add('black')
      cursorBorder.classList.add('black')
    } else {
      // Если фон светлый, курсор светлый
      cursor.classList.remove('black')
      cursorBorder.classList.remove('black')
    }
  }
}

//! Следование за курсором
function onMouseMove(e) {
  //? Красим курсор в зависимости от фона блока
  // Получаем эл  емент, на который указатель мыши пролетает
  const targetElement = document.elementFromPoint(e.clientX, e.clientY)

  // Проверяем, находится ли элемент внутри тега section
  if (targetElement && targetElement.closest('section')) {
    changeColor(targetElement)
  }

  // Проверяем, находится если элемент тега A скрыть кастомный курсор
  if (targetElement && targetElement.tagName == 'A') {
    cursor.classList.add('hidden')
    cursorBorder.classList.add('hidden')
  } else {
    cursor.classList.remove('hidden')
    cursorBorder.classList.remove('hidden')
  }

  cursorPos.x = e.clientX
  cursorPos.y = e.clientY

  mouse.x = (cursorPos.x / window.innerWidth) * 2 - 1
  mouse.y = -(cursorPos.y / window.innerHeight) * 2 + 1

  pointLight.position.x = mouse.x
  pointLight.position.y = mouse.y

  raycaster.setFromCamera(mouse, camera)
  raycaster.ray.intersectPlane(plane, pointOfIntersection)
  base.lookAt(pointOfIntersection)

  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
  cursor.style.opacity = 1
  cursor.style.visibility = 'visible'

  cursorBorder.style.opacity = 1
  cursorBorder.style.visibility = 'visible'
}
