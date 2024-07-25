document.addEventListener('DOMContentLoaded', () => {
  // ! SLIDER
  // ? Слайдер на галвной в коллекциях
  let swiperCollection = new Swiper('.collection_carousel', {
    spaceBetween: 30,
    slidesPerView: 4,

    loop: true,
    freeMode: true,

    // Autoplay
    speed: 6200,

    autoplay: {
      delay: 3,
      disableOnInteraction: false,
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      767: {
        slidesPerView: 2,
      },
      1240: {
        slidesPerView: 3,
      },
    },

    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })

  //! SLIDER Dropdown
  // ? Слайдер в навигации
  let swiperDropdown = new Swiper('.dropdown__menu__swiper', {
    spaceBetween: 30,
    slidesPerView: 3,
    direction: 'vertical',

    loop: true,
    freeMode: false,
    allowTouchMove: false,

    // Autoplay
    speed: 2200,

    autoplay: {
      delay: 3,
      disableOnInteraction: false,
    },
  })

  //! SLIDE TO
  // ? Функция в которую можно передать ID и слайдер, для перехода к слайду по id

  const slideTo = (slider, id) => {
    slider.slideToLoop(id, 400, true)
  }

  //! SELECT SLIDE ON MENU
  // ? Переход к слайдам при наведении курсора в шапке -> навигация -> коллекции

  const cloneSlide = (cloneArea, targetLink) => {
    let targetElement = document.querySelector('[imageLinkTarget="' + targetLink + '"]')

    let clone = targetElement.cloneNode(true)

    cloneArea.innerHTML = ''

    cloneArea.appendChild(clone)
  }

  const deleteSlide = (cloneArea) => {
    // cloneArea.innerHTML = ''
  }

  const slideToArrLinks = () => {
    const cloneArea = document.querySelector('.dropdown__menu__selected')
    const dropdownArrLink = document.querySelectorAll('.dropdown__menu--collection li')

    dropdownArrLink.forEach((item, id) => {
      item.addEventListener('mouseover', () => {
        let targetLink = Number(item.getAttribute('imageLink'))

        cloneArea.classList.add('clone_in')
        cloneSlide(cloneArea, targetLink)
      })
    })

    dropdownArrLink.forEach((item, id) => {
      item.addEventListener('mouseout', () => {
        cloneArea.classList.remove('clone_in')
        deleteSlide(cloneArea)
      })
    })
  }

  slideToArrLinks()

  //! STOP / PLAY SLIDER ONMOUSE
  // ? Создай функцию с классом слайдера и таргет зоной, чтобы останавливать его при наведении курсора

  const stopPlay = (slider, target) => {
    let targetElement = document.querySelector(target)

    let distanceRatio
    let duration
    let startTimer

    targetElement.addEventListener('mouseenter', function () {
      // Остановить слайд на текущей позиции.
      slider.setTranslate(slider.getTranslate())

      // Вычисление расстояния между текущим слайдом и следующим слайдом.
      // 0,3 соответствует 30% расстоянию до следующего слайда.
      distanceRatio = Math.abs((slider.width * slider.activeIndex + slider.getTranslate()) / slider.width)

      duration = slider.params.speed * distanceRatio

      slider.autoplay.stop()
    })

    targetElement.addEventListener('mouseleave', function (delay = duration) {
      if (startTimer) clearTimeout(startTimer)

      startTimer = setTimeout(() => {
        slider.slideTo(slider.activeIndex, duration / 5)
        slider.autoplay.start()
      }, delay + 400)
    })
  }

  if (document.querySelector('.collection_carousel')) {
    console.log('+')
    stopPlay(swiperCollection, '.collection_carousel .swiper-wrapper')
  }

  //! SMOOTH SCROLL
  // ? Находит ссылки с якорями и кастует плавный скролл

  const smooth_scroll = () => {
    let anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]'))

    anchorLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault()

        let targetId = this.getAttribute('href').substring(1)
        let targetElement = document.getElementById(targetId)

        if (targetElement) {
          let targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          })
        }
      })
    })
  }

  smooth_scroll()

  //! Open Dropdown

  const openMenu = () => {
    const nav_items = document.querySelectorAll('.header__nav nav li')
    const headerMenu = document.querySelector('.header')
    let openMenu = ''

    const openDropdownMenu = (typeMenu) => {
      const header = document.querySelector('.header')

      if (openMenu !== typeMenu) {
        if (openMenu !== '') {
          header.classList.remove(openMenu)
        }

        header.classList.add(typeMenu, 'light-theme')
        openMenu = typeMenu
      } else {
        return false
      }
    }

    const closeMenu = (typeMenu) => {
      headerMenu.classList.remove('light-theme', typeMenu)
    }

    nav_items.forEach((item) => {
      let typeMenu = 'open-' + item.getAttribute('dropdown')

      // Open
      item.addEventListener('mouseenter', () => openDropdownMenu(typeMenu))
      // Close
      headerMenu.addEventListener('mouseleave', () => closeMenu(typeMenu))
    })
  }

  openMenu()

  //! Toggle Image in Dropdown About

  const toggleImageDropdownSidebar = () => {
    const linkList = document.querySelectorAll('.dropdown__menu--main li')
    const imageList = document.querySelectorAll('.dropdown__image_area img')
    const imageArea = document.querySelector('.dropdown__image_area')

    linkList.forEach((item, id) => {
      item.addEventListener('mouseenter', () => {
        item.classList.add('hover')
        imageList[id].classList.add('selected')
        imageArea.classList.add('toggle-selected')
      })
      item.addEventListener('mouseleave', () => {
        item.classList.remove('hover')
        imageList[id].classList.remove('selected')
        imageArea.classList.remove('toggle-selected')
      })
    })
  }

  toggleImageDropdownSidebar()

  //! 3D Scene Three.js with GLTF
  //! ... & preloader from scene load

  const model3D = () => {
    //? Место рендеринга модели
    const canvas = document.querySelector('.webgl')

    //? Preloader
    gsap.from('.overlay h1 span', {
      duration: 1,
      y: '100%',
    })

    const overlay = document.querySelector('.overlay')

    const loadingManager = new THREE.LoadingManager(
      () => {
        window.setTimeout(() => {
          gsap.to('.overlay h1 span', {
            duration: 1,
            y: '-100%',
          })

          gsap.to(overlay, {
            duration: 2,
            opacity: 0,
            delay: 1,
          })
          gsap.to(overlay, {
            duration: 1,
            display: 'none',
            delay: 2,
          })
        }, 2000)
      },
      () => {},
      () => {
        console.error('error')
      }
    )

    //? Создаем сцену

    const scene = new THREE.Scene()

    //? GLTF Model

    let base = new THREE.Object3D()
    scene.add(base)

    //? Загрузка GLTF модели

    const gltfLoader = new THREE.GLTFLoader(loadingManager)

    //? Загружаем модель
    gltfLoader.load(
      './assets/model/door/scene.gltf',
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            //? Убираем прозначность модели
            // если не задана в самой моделе, перестраховка
            child.material.transparent = false
            child.material.opacity = 1
          }
        })

        //? Добавляем на сцену
        base.add(gltf.scene)

        //? Устанавливаем позицию модели в сцене
        gltf.scene.position.set(0, -0.4, 0)
      },
      undefined,
      function (error) {
        console.error(error)
      }
    )

    //? Размеры окна

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    //! Создаем камеру

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    //! Установка позиции камеры
    camera.position.z = 2.5

    scene.add(camera)

    //! Создаем освещение

    // Добавление общего освещения в сцену
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6)
    scene.add(ambientLight)

    // Направленный свет
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(500, 200, 500) //looking at 0,0,0
    scene.add(light)

    // Добавление точечный свет
    const pointLight = new THREE.PointLight(0xffffff, 2.5)
    pointLight.position.z = 1
    scene.add(pointLight)

    let plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2)
    let raycaster = new THREE.Raycaster()
    let mouse = new THREE.Vector2()
    let pointOfIntersection = new THREE.Vector3()
    canvas.addEventListener('mousemove', onMouseMove, false)

    //? Меняем курсор и задаем границы

    const cursor = document.querySelector('.cursor')
    const cursorBorder = document.querySelector('.cursor-border')

    const cursorPos = new THREE.Vector2()
    const cursorBorderPos = new THREE.Vector2()

    //? Следование за курсором

    function onMouseMove(e) {
      cursorPos.x = e.clientX
      cursorPos.y = e.clientY

      mouse.x = (cursorPos.x / sizes.width) * 2 - 1
      mouse.y = -(cursorPos.y / sizes.height) * 2 + 1

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

    //? Создаем рендерер

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antiAlias: true,
      alpha: true,
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.render(scene, camera)

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera)

      const easting = 8
      cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easting
      cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easting

      cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`
    })
  }

  model3D()
})

const mobileMenuToggle = () => {
  const openMobileMenuBtn = document.querySelector('.mobile_menu-open_btn')
  const closeMobileMenuBtn = document.querySelector('.close_menu')
  const header = document.querySelector('.header')
  const headerNav = document.querySelector('.header__nav')

  openMobileMenuBtn.addEventListener('click', () => {
    header.classList.add('shadowbox-active')
    headerNav.classList.add('active')
  })

  closeMobileMenuBtn.addEventListener('click', () => {
    header.classList.remove('shadowbox-active')
    headerNav.classList.remove('active')
  })
}

mobileMenuToggle()
