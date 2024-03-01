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

  const cloneSlide = (cloneArea) => {
    let targetElement = document.querySelector(
      '.dropdown__menu__swiper .swiper-slide-active'
    )

    let clone = targetElement.cloneNode(true)

    cloneArea.innerHTML = ''

    cloneArea.appendChild(clone)
  }

  const deleteSlide = (cloneArea) => {
    // cloneArea.innerHTML = ''
  }

  const slideToArrLinks = () => {
    const cloneArea = document.querySelector('.dropdown__menu__selected')
    const dropdownArrLink = document.querySelectorAll(
      '.dropdown__menu--collection a'
    )

    dropdownArrLink.forEach((item, id) => {
      item.addEventListener('mouseover', () => {
        slideTo(swiperDropdown, id)
        swiperDropdown.autoplay.stop()

        cloneArea.classList.add('clone_in')
        cloneSlide(cloneArea)
      })
    })

    dropdownArrLink.forEach((item, id) => {
      item.addEventListener('mouseout', () => {
        swiperDropdown.autoplay.start()
        slideTo(swiperDropdown, id)

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
      distanceRatio = Math.abs(
        (slider.width * slider.activeIndex + slider.getTranslate()) /
          slider.width
      )

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

  stopPlay(swiperCollection, '.collection_carousel .swiper-wrapper')

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
          let targetPosition =
            targetElement.getBoundingClientRect().top + window.pageYOffset
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
      // headerMenu.addEventListener('mouseleave', () => closeMenu(typeMenu))
    })
  }

  openMenu()

  //! Toggle Image in Dropdown About

  const toggleImageDropdownSidebar = () => {
    const linkList = document.querySelectorAll('.dropdown__menu--about li')
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
})
