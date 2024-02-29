document.addEventListener('DOMContentLoaded', () => {
  // ! SLIDER
  var swiper = new Swiper('.collection_carousel', {
    spaceBetween: 30,
    slidesPerView: 4,

    loop: true,
    freeMode: true,
    freeModeMomentum: false,
    loopAdditionalSlides: 0,
    centeredSlidesBounds: true,
    slideToClickedSlide: true,

    // speed: 3200,

    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },

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
  var swiperDropdown = new Swiper('.dropdown__menu__swiper', {
    spaceBetween: 30,
    slidesPerView: 3,
    direction: 'vertical',

    loop: true,
    freeMode: true,
    freeModeMomentum: false,
    loopAdditionalSlides: 0,
    centeredSlidesBounds: true,
    slideToClickedSlide: true,
    centeredSlides: true,

    // Autoplay
    speed: 5200,

    autoplay: {
      delay: 3,
      disableOnInteraction: false,
    },
  })

  // ! SLIDE TO
  const dropdownArrLink = document.querySelectorAll('.dropdown__menu a')

  function slideTo(id) {
    swiperDropdown.slideTo(id + 1, 400, true)
  }

  dropdownArrLink.forEach((item, id) => {
    item.addEventListener('mouseover', () => slideTo(id))
  })

  // ! STOP / PLAY SLIDER ONMOUSE

  function stopPlay(slider, target) {
    let targetElement = document.querySelector(target)

    targetElement.addEventListener('mouseover', function () {
      slider.autoplay.stop()
    })

    targetElement.addEventListener('mouseout', function () {
      slider.autoplay.start()
    })
  }

  stopPlay(swiperDropdown, '.dropdown__menu')

  // ! BTN ANIMATION
  if (document.querySelector('.animate-icon')) {
    const animate_btns = document.querySelector('.animate-icon')

    const img = animate_btns.querySelector('img')
    const span = animate_btns.querySelector('span')

    // Наводим курсор
    animate_btns.addEventListener('mouseenter', () => {
      img.style = 'transform: translate(22px, 0px); opacity: 0;'
      span.style = 'transform: translate(22px, 0px);'
      swingInterval_in = setInterval(swing_in_1, 240)
    })

    function swing_in_1() {
      img.style = 'transform: translate(-182px, 0px); opacity: 0;'
      span.style = 'transform: translate(22px, 0px);'
      clearInterval(swingInterval_in)
      swingInterval_in_2 = setInterval(swing_in_2, 270)
    }

    function swing_in_2() {
      img.style = 'transform: translate(-142px, 0px); opacity: 1;'
      span.style = 'transform: translate(22px, 0px);'
      clearInterval(swingInterval_in_2)
    }

    // Убираем курсор
    animate_btns.addEventListener('mouseleave', () => {
      img.style = 'transform: translate(-182px, 0px); opacity: 0;'
      span.style = 'transform: translate(22px, 0px);'
      swingInterval_out = setInterval(swing_out_1, 300)
    })

    function swing_out_1() {
      img.style = 'transform: translate(42px, 0px); opacity: 0;'
      span.style = 'transform: translate(0, 0px);'
      clearInterval(swingInterval_out)
      swingInterval_out_2 = setInterval(swing_out_2, 270)
    }

    function swing_out_2() {
      img.style = 'transform: translate(0, 0px); opacity: 1;'
      span.style = 'transform: translate(0, 0px);'
      clearInterval(swingInterval_out_2)
    }
  }

  // ! SMOOTH SCROLL

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

  //! Open Dropdown

  const nav_items = document.querySelectorAll('.header__nav nav li')

  nav_items.forEach((item) => {
    item.addEventListener('mouseover', () =>
      openDropdownMenu(item.getAttribute('dropdown'))
    )
  })

  const openDropdownMenu = (typeMenu) => {
    const header = document.querySelector('.header')
    let typeName = 'open-' + typeMenu

    header.classList.add(typeName, 'light-theme')
  }

  const closeBtnMenu = document.querySelector('.dropdown__close')
  const headerMenu = document.querySelector('.header')

  const CloseMenu = () => {
    headerMenu.classList.remove('light-theme', 'open-collection')
  }

  closeBtnMenu.addEventListener('click', () => CloseMenu())
})
