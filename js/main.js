// Header
const $sections = document.querySelectorAll('section');
const $headerMenu = document.querySelector('.header-menu');
const $trigger = document.querySelector('.trigger');
const $as = $headerMenu.querySelectorAll('a');

console.log($sections);
$trigger.addEventListener('click', function () {
  $headerMenu.classList.toggle('active');
  this.classList.toggle('active');
});

$sections.forEach(function (sectionEl) {
  sectionEl.addEventListener('click', function () {
    $headerMenu.classList.remove('active');
    $trigger.classList.remove('active');
  });
});

$as.forEach(function (a) {
  a.addEventListener('click', function () {
    $headerMenu.classList.remove('active');
    $trigger.classList.remove('active');
  });
});

// Scroll Event
const $header = document.querySelector('header');
window.addEventListener('scroll', function () {
  if (scrollY > 100) {
    $header.classList.add('active');
  } else {
    $header.classList.remove('active');
  }
});

// Swiper-Slider
new Swiper('.welcome .swiper-container', {
  spaceBetween: 30,
  effect: 'fade',
  loop: true,
  autoplay: {
    delay: 4000,
  },
});

new Swiper('.review .swiper-container', {
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2000,
  },
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  pagination: {
    el: '.swiper-pagination',
  },
});

new Swiper('.guide .swiper-container', {
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2000,
  },
  pagination: {
    el: '.swiper-pagination',
  },
});

// Typeit
new TypeIt('#typing', {
  strings: ['Business strategy', 'Organization Management', 'Business Innovation'],
  speed: 100,
  autoStart: true,
  breakLines: false,
}).go();

// Banner
const $tab1 = document.querySelectorAll('.tab1');
const $tab2 = document.querySelectorAll('.tab2');
const $tab3 = document.querySelectorAll('.tab3');

$tab1[0].addEventListener('click', function () {
  $tab1.forEach((el) => el.classList.add('active'));
  $tab2.forEach((el) => el.classList.remove('active'));
  $tab3.forEach((el) => el.classList.remove('active'));
});
$tab2[0].addEventListener('click', function () {
  $tab2.forEach((el) => el.classList.add('active'));
  $tab1.forEach((el) => el.classList.remove('active'));
  $tab3.forEach((el) => el.classList.remove('active'));
});
$tab3[0].addEventListener('click', function () {
  $tab3.forEach((el) => el.classList.add('active'));
  $tab1.forEach((el) => el.classList.remove('active'));
  $tab2.forEach((el) => el.classList.remove('active'));
});

// FAQ
const $faqItem = document.querySelectorAll('.faq-item');
for (let i = 0; i < 5; i++) {
  $faqItem[i].addEventListener('click', function (e) {
    $faqItem.forEach((el) => el.classList.remove('active'));
    e.currentTarget.classList.add('active');
  });
}

// Video Modal
const $body = document.querySelector('body');
const $openModal = document.querySelector('.open-modal');
const $videoModal = document.querySelector('.video-modal');
const $xiClose = document.querySelector('.xi-close');
$openModal.addEventListener('click', function () {
  $videoModal.classList.add('active');
  $body.classList.add('active');
});
$xiClose.addEventListener('click', function () {
  $videoModal.classList.remove('active');
  $body.classList.remove('active');
});

// Go to Top
const $btnTop = document.querySelector('.btn-top');
window.addEventListener('scroll', function () {
  if (scrollY > 100) {
    $btnTop.classList.add('active');
  } else {
    $btnTop.classList.remove('active');
  }
});
$btnTop.addEventListener('click', function () {
  gsap.to(window, 0, {
    scrollTo: 0,
  });
});

// scroll-spy .show
const $spyEls = document.querySelectorAll('.scroll-spy');
$spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({
    triggerElement: spyEl,
    triggerHook: 0.8,
  })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});
