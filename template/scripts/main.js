document.addEventListener('DOMContentLoaded', () => {
  // ! SLIDER
  var swiper = new Swiper('.collection_carousel', {
    spaceBetween: 30,
    slidesPerView: 4,

    loop: true,
    // speed: 3200,
    freeMode: true,
    freeModeMomentum: false,
    loopAdditionalSlides: 0,
    centeredSlidesBounds: true,
    slideToClickedSlide: true,

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

  // ! SLIDER Dropdowm
  var swiperDropdowm = new Swiper('.dropdown__menu__swiper', {
    spaceBetween: 0,
    slidesPerView: 1,
    direction: 'vertical',

    loop: true,
    // speed: 3200,
    freeMode: true,
    freeModeMomentum: false,
    loopAdditionalSlides: 0,
    centeredSlidesBounds: true,
    slideToClickedSlide: true,

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

  // ! STOP / PLAY SLIDER ONMOUSE

  // const targetSlider = document.querySelector('.swiper-wrapper')

  // targetSlider.addEventListener('mouseenter', function () {
  //   swiper.autoplay.stop()
  // })

  // targetSlider.addEventListener('mouseleave', function () {
  //   swiper.autoplay.start()
  // })

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

  //

  //

  //
})
