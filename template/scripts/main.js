document.addEventListener('DOMContentLoaded', () => {
  // ! SLIDER
  // ? Слайдер на галвной в коллекциях
  let swiperCollection = new Swiper('.collection_carousel', {
    spaceBetween: 30,
    slidesPerView: 4,

    loop: true,
    freeMode: true,

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

  // ! SLIDER Dropdown
  // ? Слайдер в навигации
  let swiperDropdown = new Swiper('.dropdown__menu__swiper', {
    spaceBetween: 30,
    slidesPerView: 3,
    direction: 'vertical',

    loop: true,
    freeMode: false,
    allowTouchMove: false,

    // Autoplay
    speed: 5200,

    autoplay: {
      delay: 3,
      disableOnInteraction: false,
    },
  })

  // ! SLIDE TO
  // ? Функция в которую можно передать ID и слайдер, для перехода к слайду по id

  const slideTo = (slider, id) => {
    slider.slideToLoop(id, 400, true)
  }

  // ? Переход к слайдам при наведении курсора в шапке -> навигация -> коллекции

  const slideToArrLinks = () => {
    const dropdownArrLink = document.querySelectorAll('.dropdown__menu a')

    dropdownArrLink.forEach((item, id) => {
      item.addEventListener('mouseenter', () => {
        slideTo(swiperDropdown, id)
        swiperDropdown.autoplay.stop()
      })
    })

    dropdownArrLink.forEach((item, id) => {
      item.addEventListener('mouseleave', () => {
        slideTo(swiperDropdown, id)
        swiperDropdown.autoplay.start()
      })
    })
  }

  slideToArrLinks()

  // ! STOP / PLAY SLIDER ONMOUSE
  // ? Создай функцию с классом слайдера и таргет зоной, чтобы останавливать его при наведении курсора

  const stopPlay = (slider, target) => {
    let targetElement = document.querySelector(target)

    targetElement.addEventListener('mouseenter', function () {
      console.log('_')
      slider.autoplay.stop()
    })

    targetElement.addEventListener('mouseleave', function () {
      console.log('+')
      slider.autoplay.start()
    })
  }

  stopPlay(swiperCollection, '.collection_carousel .swiper-wrapper')

  // ! SMOOTH SCROLL
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

    const openDropdownMenu = (typeMenu) => {
      const header = document.querySelector('.header')
      header.classList.add(typeMenu, 'light-theme')
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

  // // ! BTN ANIMATION
  // if (document.querySelector('.animate-icon')) {
  //   const animate_btns = document.querySelector('.animate-icon')

  //   const img = animate_btns.querySelector('img')
  //   const span = animate_btns.querySelector('span')

  //   // Наводим курсор
  //   animate_btns.addEventListener('mouseenter', () => {
  //     img.style = 'transform: translate(22px, 0px); opacity: 0;'
  //     span.style = 'transform: translate(22px, 0px);'
  //     swingInterval_in = setInterval(swing_in_1, 240)
  //   })

  //   function swing_in_1() {
  //     img.style = 'transform: translate(-182px, 0px); opacity: 0;'
  //     span.style = 'transform: translate(22px, 0px);'
  //     clearInterval(swingInterval_in)
  //     swingInterval_in_2 = setInterval(swing_in_2, 270)
  //   }

  //   function swing_in_2() {
  //     img.style = 'transform: translate(-142px, 0px); opacity: 1;'
  //     span.style = 'transform: translate(22px, 0px);'
  //     clearInterval(swingInterval_in_2)
  //   }

  //   // Убираем курсор
  //   animate_btns.addEventListener('mouseleave', () => {
  //     img.style = 'transform: translate(-182px, 0px); opacity: 0;'
  //     span.style = 'transform: translate(22px, 0px);'
  //     swingInterval_out = setInterval(swing_out_1, 300)
  //   })

  //   function swing_out_1() {
  //     img.style = 'transform: translate(42px, 0px); opacity: 0;'
  //     span.style = 'transform: translate(0, 0px);'
  //     clearInterval(swingInterval_out)
  //     swingInterval_out_2 = setInterval(swing_out_2, 270)
  //   }

  //   function swing_out_2() {
  //     img.style = 'transform: translate(0, 0px); opacity: 1;'
  //     span.style = 'transform: translate(0, 0px);'
  //     clearInterval(swingInterval_out_2)
  //   }
  // }
})
