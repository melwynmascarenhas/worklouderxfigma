/* eslint-disable */
import { gsap } from 'gsap'
import anime from 'animejs/lib/anime.es.js'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Typewriter from 'typewriter-effect/dist/core'
import { Flip } from 'gsap/Flip'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

import Swiper from 'swiper'
import {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
  Thumbs,
  Mousewheel,
  Keyboard,
  Parallax,
} from 'swiper/modules'
// import Swiper and modules styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
Swiper.use([
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
  Thumbs,
  Mousewheel,
  Keyboard,
  Parallax,
])

// Function to initialize Lenis with options and event listeners
function initializeLenis() {
  const lenis = new Lenis({
    autoResize: true,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })

  lenis.on('scroll', (e) => {
    console.log(e)
    ScrollTrigger.update() // Update ScrollTrigger on Lenis scroll event
  })

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  return lenis
}

let lenis
function enableScrolling() {
  // Enable scrolling after the delay
  document.body.style.overflowY = 'auto'

  setTimeout(() => {
    onDOMChange()
  }, 250)
}

// Initialize Lenis
//let lenis = initializeLenis()

// Function to handle DOM changes, e.g., accordion expansion
const onDOMChange = () => {
  console.log('DOM changed')

  // Refresh ScrollTrigger to recalculate trigger positions
  ScrollTrigger.refresh()

  // Destroy the current instance of lenis
  if (lenis) {
    lenis.destroy()
  }

  // Re-initialize lenis after 250ms as it takes time for dom to update
  setTimeout(() => {
    lenis = initializeLenis()
  }, 250)
}

// Example: Attach the DOM change handler to an accordion expand event
let dropdowns = document.querySelectorAll('.dropdown-toggle')

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener('click', onDOMChange)
})
//////////LENIS ENDS//////

window.onload = function () {
  document.body.style.overflow = 'hidden'

  const preloaderTL = gsap.timeline()
  preloaderTL
    .to('.loader-lottie', {
      scale: 0,
      duration: 1,
      delay: 4,
      ease: 'power4.inOut',
    })
    .to(
      '.loader-text',
      {
        opacity: 0,
        duration: 1,
        ease: 'power4.inOut',
      },
      '<'
    )
    .to('.preloader-container', {
      opacity: 0,
      delay: 0.2,
      duration: 1,
      ease: 'power4.inOut',
      onComplete: enableScrolling,
    })
}

//typewriter
let typewriters = document.querySelectorAll('.typewriter')
typewriters.forEach((typewriter) => {
  typewriter.innerText = ' '
})
function startTypewriter() {
  typewriters.forEach((typewriter) => {
    new Typewriter(typewriter, {
      strings: ['...'],
      autoStart: true,
      loop: true,
      delay: 400,
      pauseFor: 100,
      cursor: ' ',
      onRemoveNode: () => {
        typewriter.style.display = 'none'
        setTimeout(() => {
          typewriter.style.display = 'flex'
        }, 200)
      },
    })
  })
}
startTypewriter()
//typewrite ends

const initial =
  'M385.982 43.3623H373.994V0.637675H398.927C402.71 0.637675 405.878 1.14782 408.428 2.16811C410.979 3.1884 412.892 4.67632 414.167 6.63188C415.485 8.54492 416.144 10.9043 416.144 13.7101C416.144 15.9633 415.74 17.9188 414.933 19.5768C414.167 21.1923 412.935 22.5101 411.234 23.5304C409.534 24.5082 407.323 25.1671 404.602 25.5072V26.1449C406.813 26.6976 408.386 27.5266 409.321 28.6319C410.299 29.6947 411.192 31.0338 411.999 32.6493L417.292 43.3623H403.454L398.353 32.9043C397.843 31.8415 397.311 31.0126 396.759 30.4174C396.206 29.8222 395.483 29.4183 394.591 29.2058C393.698 28.9507 392.465 28.8232 390.892 28.8232H385.982V43.3623ZM385.982 11.4145V19.8956H398.799C400.542 19.8956 401.775 19.6406 402.498 19.1304C403.221 18.6203 403.582 17.4512 403.582 15.6232C403.582 13.9227 403.221 12.7961 402.498 12.2435C401.775 11.6908 400.542 11.4145 398.799 11.4145H385.982Z M342.719 43.3623H330.731V0.637675H342.719V43.3623ZM368.673 43.3623H333.983V32.5855H368.673V43.3623ZM367.716 27.229H333.983V16.5159H367.716V27.229ZM368.673 11.4145H333.983V0.637675H368.673V11.4145Z M302.626 43.3623H284.005V32.5855H302.626C305.176 32.5855 307.196 32.3729 308.684 31.9478C310.171 31.5227 311.234 30.5662 311.872 29.0783C312.51 27.5478 312.828 25.1884 312.828 22C312.828 18.7691 312.51 16.4097 311.872 14.9217C311.234 13.4338 310.171 12.4773 308.684 12.0522C307.196 11.627 305.176 11.4145 302.626 11.4145H284.005V0.637675H302.626C307.344 0.637675 311.426 1.48792 314.869 3.1884C318.313 4.84637 320.97 7.26956 322.84 10.458C324.711 13.6464 325.646 17.4937 325.646 22C325.646 26.5063 324.711 30.3536 322.84 33.542C320.97 36.7304 318.313 39.1749 314.869 40.8754C311.426 42.5333 307.344 43.3623 302.626 43.3623ZM292.997 43.3623H281.008V0.637675H292.997V43.3623Z M252.993 44C248.019 44 243.917 43.256 240.686 41.7681C237.497 40.2377 235.117 38.0908 233.544 35.3275C231.971 32.5217 231.184 29.227 231.184 25.4435V0.637675H243.173V24.4869C243.173 26.5275 243.428 28.1217 243.938 29.2696C244.448 30.4174 245.405 31.2251 246.807 31.6927C248.253 32.1604 250.315 32.3942 252.993 32.3942C255.714 32.3942 257.776 32.1604 259.179 31.6927C260.581 31.2251 261.538 30.4174 262.048 29.2696C262.558 28.1217 262.813 26.5275 262.813 24.4869V0.637675H274.802V25.4435C274.802 29.227 274.015 32.5217 272.442 35.3275C270.869 38.0908 268.467 40.2377 265.236 41.7681C262.048 43.256 257.967 44 252.993 44Z M64.7884 44C59.857 44 55.6058 43.1072 52.0348 41.3217C48.5063 39.4937 45.8068 36.943 43.9363 33.6696C42.0657 30.3536 41.1305 26.4638 41.1305 22C41.1305 17.5362 42.0657 13.6676 43.9363 10.3942C45.8068 7.07826 48.5063 4.52754 52.0348 2.74203C55.6058 0.914009 59.857 0 64.7884 0C64.7967 0 202.433 2.36945e-06 202.441 7.10836e-06C207.532 0.00294563 211.839 0.916953 215.361 2.74203C218.932 4.52754 221.653 7.07826 223.524 10.3942C225.394 13.6676 226.329 17.5362 226.329 22C226.329 26.4638 225.394 30.3536 223.524 33.6696C221.653 36.943 218.932 39.4937 215.361 41.3217C211.84 43.1036 207.535 43.9964 202.448 44C202.437 44 64.7988 44 64.7884 44ZM64.7884 32.5217C64.7988 32.5217 202.437 32.5217 202.448 32.5217C205.323 32.5197 207.566 32.2434 209.176 31.6928C210.791 31.0976 211.918 30.0348 212.556 28.5043C213.236 26.9739 213.576 24.8058 213.576 22C213.576 19.1517 213.236 16.9836 212.556 15.4957C211.918 13.9652 210.791 12.9237 209.176 12.371C207.566 11.7779 205.323 11.4803 202.446 11.4783C202.436 11.4783 64.7984 11.4783 64.7884 11.4783C61.8976 11.4783 59.6657 11.7758 58.0928 12.371C56.5198 12.9237 55.4145 13.9652 54.7768 15.4957C54.1817 16.9836 53.8841 19.1517 53.8841 22C53.8841 24.8058 54.1817 26.9739 54.7768 28.5043C55.4145 30.0348 56.5198 31.0976 58.0928 31.6928C59.6657 32.2454 61.8976 32.5217 64.7884 32.5217Z M11.9884 43.3623H0V0.637675H11.9884V43.3623ZM36.6667 43.3623H3.31594V32.5855H36.6667V43.3623Z'

const final =
  'M248.982 43.3623H236.994V0.637675H261.927C265.71 0.637675 268.878 1.14782 271.428 2.16811C273.979 3.1884 275.892 4.67632 277.167 6.63188C278.485 8.54492 279.144 10.9043 279.144 13.7101C279.144 15.9633 278.74 17.9188 277.933 19.5768C277.167 21.1923 275.935 22.5101 274.234 23.5304C272.534 24.5082 270.323 25.1671 267.602 25.5072V26.1449C269.813 26.6976 271.386 27.5266 272.321 28.6319C273.299 29.6947 274.192 31.0338 274.999 32.6493L280.292 43.3623H266.454L261.353 32.9043C260.843 31.8415 260.311 31.0126 259.759 30.4174C259.206 29.8222 258.483 29.4183 257.591 29.2058C256.698 28.9507 255.465 28.8232 253.892 28.8232H248.982V43.3623ZM248.982 11.4145V19.8956H261.799C263.542 19.8956 264.775 19.6406 265.498 19.1304C266.221 18.6203 266.582 17.4512 266.582 15.6232C266.582 13.9227 266.221 12.7961 265.498 12.2435C264.775 11.6908 263.542 11.4145 261.799 11.4145H248.982Z M205.719 43.3623H193.731V0.637675H205.719V43.3623ZM231.673 43.3623H196.983V32.5855H231.673V43.3623ZM230.716 27.229H196.983V16.5159H230.716V27.229ZM231.673 11.4145H196.983V0.637675H231.673V11.4145Z M165.626 43.3623H147.005V32.5855H165.626C168.176 32.5855 170.196 32.3729 171.684 31.9478C173.171 31.5227 174.234 30.5662 174.872 29.0783C175.51 27.5478 175.828 25.1884 175.828 22C175.828 18.7691 175.51 16.4097 174.872 14.9217C174.234 13.4338 173.171 12.4773 171.684 12.0522C170.196 11.627 168.176 11.4145 165.626 11.4145H147.005V0.637675H165.626C170.344 0.637675 174.426 1.48792 177.869 3.1884C181.313 4.84637 183.97 7.26956 185.84 10.458C187.711 13.6464 188.646 17.4937 188.646 22C188.646 26.5063 187.711 30.3536 185.84 33.542C183.97 36.7304 181.313 39.1749 177.869 40.8754C174.426 42.5333 170.344 43.3623 165.626 43.3623ZM155.997 43.3623H144.008V0.637675H155.997V43.3623Z M115.993 44C111.019 44 106.917 43.256 103.686 41.7681C100.497 40.2377 98.1167 38.0908 96.5437 35.3275C94.9708 32.5217 94.1843 29.227 94.1843 25.4435V0.637675H106.173V24.4869C106.173 26.5275 106.428 28.1217 106.938 29.2696C107.448 30.4174 108.405 31.2251 109.807 31.6927C111.253 32.1604 113.315 32.3942 115.993 32.3942C118.714 32.3942 120.776 32.1604 122.179 31.6927C123.581 31.2251 124.538 30.4174 125.048 29.2696C125.558 28.1217 125.813 26.5275 125.813 24.4869V0.637675H137.802V25.4435C137.802 29.227 137.015 32.5217 135.442 35.3275C133.869 38.0908 131.467 40.2377 128.236 41.7681C125.048 43.256 120.967 44 115.993 44Z M64.7884 44C59.857 44 55.6058 43.1072 52.0348 41.3217C48.5063 39.4937 45.8068 36.943 43.9363 33.6696C42.0657 30.3536 41.1305 26.4638 41.1305 22C41.1305 17.5362 42.0657 13.6676 43.9363 10.3942C45.8068 7.07826 48.5063 4.52754 52.0348 2.74203C55.6058 0.914009 59.857 0 64.7884 0C64.7967 0 65.4329 2.36945e-06 65.4411 7.10836e-06C70.5318 0.00294563 74.8386 0.916953 78.3614 2.74203C81.9324 4.52754 84.6532 7.07826 86.5237 10.3942C88.3942 13.6676 89.3295 17.5362 89.3295 22C89.3295 26.4638 88.3942 30.3536 86.5237 33.6696C84.6532 36.943 81.9324 39.4937 78.3614 41.3217C74.8401 43.1036 70.5355 43.9964 65.4476 44C65.4372 44 64.7988 44 64.7884 44ZM64.7884 32.5217C64.7988 32.5217 65.4372 32.5217 65.4476 32.5217C68.3235 32.5197 70.5662 32.2434 72.1759 31.6928C73.7913 31.0976 74.9179 30.0348 75.5556 28.5043C76.2358 26.9739 76.5759 24.8058 76.5759 22C76.5759 19.1517 76.2358 16.9836 75.5556 15.4957C74.9179 13.9652 73.7913 12.9237 72.1759 12.371C70.566 11.7779 68.3228 11.4803 65.4463 11.4783C65.4364 11.4783 64.7984 11.4783 64.7884 11.4783C61.8976 11.4783 59.6657 11.7758 58.0928 12.371C56.5198 12.9237 55.4145 13.9652 54.7768 15.4957C54.1817 16.9836 53.8841 19.1517 53.8841 22C53.8841 24.8058 54.1817 26.9739 54.7768 28.5043C55.4145 30.0348 56.5198 31.0976 58.0928 31.6928C59.6657 32.2454 61.8976 32.5217 64.7884 32.5217Z M11.9884 43.3623H0V0.637675H11.9884V43.3623ZM36.6667 43.3623H3.31594V32.5855H36.6667V43.3623Z'

let shape = document.querySelector('#initial')

window.addEventListener('load', () => {
  const timeline = anime.timeline({
    duration: 1000,
    loop: true,
    easing: 'easeInOutQuart',
    delay: 180,
  })
  timeline.add({
    targets: shape,
    d: [{ value: final }],
  })
  timeline.add({
    targets: shape,
    d: [{ value: initial }],
  })

  const parallaxTl = gsap.timeline({
    ease: 'none',
    scrollTrigger: {
      trigger: '.is-parallax-bg',
      start: 'top bottom',
      scrub: true,
    },
  })

  parallaxTl
    //.from('.contact-form', { duration: 0.4, autoAlpha: 0 }, 0.4)
    .from('.bg-image', { duration: 4, y: '-30%' }, 0)
})

function handleDropdowns() {
  gsap.matchMedia().add('(min-width: 992px)', () => {
    const hoverContainers = document.querySelectorAll('.flex-container')
    hoverContainers.forEach((container) => {
      let img = container.querySelector('.image-thumb')
      let info = container.querySelector('.feature')
      let content = info.querySelector('.feature-content')

      gsap.set(img, { width: '100%' })
      gsap.set(info, { width: '40%' })

      let ti = gsap.timeline({ paused: true }) // Create a timeline for each container and pause it initially
      ti.set(content, { autoAlpha: 1 })
      ti.to(content, {
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power2.inOut',
      })
      ti.to(info, {
        width: '0%',
        paddingLeft: '0',
        paddingRight: '0',
        duration: 0.5,
        ease: 'power2.inOut',
      })
      ti.to(img, { width: '100%', duration: 0.5, ease: 'power2.inOut' }, '<')
      ti.to(
        container,
        { gap: '0rem', duration: 0.5, ease: 'power2.inOut' },
        '<'
      )
      container.addEventListener('mouseover', () => {
        ti.play() // Start the animation when mouseover event occurs
      })

      container.addEventListener('mouseout', () => {
        ti.reverse() // Reverse the animation when mouseout event occurs
      })
    })
  })
  gsap.matchMedia().add('(max-width: 991px)', () => {
    const hoverContainers = document.querySelectorAll('.flex-container')
    hoverContainers.forEach((container) => {
      let img = container.querySelector('.image-thumb')
      let info = container.querySelector('.feature')
      let content = info.querySelector('.feature-content')
      gsap.set(img, { width: '100%' })
      gsap.set(info, { width: '100%' })
      gsap.set(content, { autoAlpha: 1 })
    })
  })
}

// Initial check and event listener for window resize
handleDropdowns()
window.addEventListener('resize', handleDropdowns)

// Select all buttons with the class 'select-btn'
const buttons = document.querySelectorAll('.select-btn')

// Add click event listener to each button
buttons.forEach((button) => {
  button.addEventListener('click', function () {
    // Remove the 'selected' class from all buttons
    buttons.forEach((btn) => btn.classList.remove('selected'))

    // Add the 'selected' class to the clicked button
    this.classList.add('selected')
  })
})

//SWIPER
const bulletWrapper = document.querySelector('.swiper-bullet-wrapper')
const bgslider = new Swiper('.swiper_gallery', {
  slidePerView: 1,
  slideActiveClass: 'is-active',
  speed: 1000,
  loop: true,
  // loopedSlides: 8,
  keyboard: true,
  mousewheel: {
    forceToAxis: true,
  },
  centeredSlides: true,
  allowTouchMove: true, //click and drag to change
  followFinger: true, //move with click and drag
  navigation: {
    nextEl: '.slider-next',
    prevEl: '.slider-prev',
  },
  pagination: {
    el: bulletWrapper,
    bulletClass: 'swiper-bullet',
    bulletActiveClass: 'is-active',
    // bulletElement: 'button',
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
})

//FLIP MENU
gsap.registerPlugin(Flip)
let hamburgerEl = document.querySelector('.nav_hamburger_wrap')
let navLineEl = document.querySelectorAll('.nav_hamburger_line')
let flipItemEl = document.querySelector('.nav_hamburger_base')
let menuWrapEl = document.querySelector('.menu_wrap')
let menuBaseEl = document.querySelector('.menu_base')
let menuContainEl = document.querySelector('.menu_contain')

let flipDuration = 0.6

function flip(forwards) {
  let state = Flip.getState(flipItemEl)
  if (forwards) {
    menuContainEl.appendChild(flipItemEl)
  } else {
    hamburgerEl.appendChild(flipItemEl)
  }
  Flip.from(state, { duration: flipDuration })
}

let tl = gsap.timeline({ paused: true })
tl.set(menuWrapEl, { display: 'flex' })
//from is used because we want to move the base first
tl.from(menuBaseEl, {
  opacity: 0,
  duration: flipDuration,
  ease: 'none',
  //conditional...only runs when the timeline starts
  onStart: function () {
    flip(true)
  },
})
tl.to(navLineEl[0], { y: 4, rotate: 45, duration: flipDuration }, '<')
tl.to(navLineEl[1], { y: -4, rotate: -45, duration: flipDuration }, '<')

const menuLinks = gsap.utils.toArray('.menu_link')
tl.from(menuLinks, {
  opacity: 0,
  yPercent: 50,
  duration: 0.2,
  stagger: { amount: 0.2 },
  //conditional...only runs when the tween finishes the reverse to the start point
  //here moving the base after the links disappear completely
  onReverseComplete: function () {
    flip(false)
  },
})

function openMenu(open) {
  //check if the animation is playing to stop intteruption
  if (!tl.isActive()) {
    if (open) {
      tl.play()
      hamburgerEl.classList.add('nav-open')
      document.body.style.overflow = 'hidden'
    } else {
      //play close animation because because open menu was set to false
      tl.reverse()
      hamburgerEl.classList.remove('nav-open')
      document.body.style.overflow = ''
    }
  }
}

//callback to perform menu open or close
hamburgerEl.addEventListener('click', function () {
  //checking if the menu is open or closed
  if (hamburgerEl.classList.contains('nav-open')) {
    //then set openmenu to false
    openMenu(false)
  } else {
    openMenu(true)
  }
})

menuBaseEl.addEventListener('mouseenter', function () {
  openMenu(false)
})
menuBaseEl.addEventListener('click', function () {
  openMenu(false)
})

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    openMenu(false)
  }
})
