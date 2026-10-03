'use strict';

//#region menu

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#menu') {
    document.body.classList.add('page__body--with-menu');
  } else {
    document.body.classList.remove('page__body--with-menu');
  }
});

//#endregion

//#region slider

const next = document.querySelector('.slider__switch-button--next');
const prev = document.querySelector('.slider__switch-button--prev');
const slides = document.querySelector('.slider__slides');

const countOfSlides = slides.children.length;

// Infinite loop technique: clone the first/last slide at each end of the
// track. When a clone finishes sliding into view, silently "jump" to the
// real slide with transitions disabled for one frame, so the loop feels
// seamless in both directions.

const firstClone = slides.firstElementChild.cloneNode(true);
const lastClone = slides.lastElementChild.cloneNode(true);

slides.appendChild(firstClone);
slides.prepend(lastClone);

let position = 1;

setInitialPosition();

next.addEventListener('click', moveNext);
prev.addEventListener('click', movePrev);

function moveNext () {
  if (position >= countOfSlides + 1) {
    return;
  }

  goToSlide(position + 1);
}

function movePrev () {
  if (position <= 0) {
    return;
  }

  goToSlide(position - 1);
}

slides.addEventListener('transitionend', e => {
  if (e.propertyName !== 'transform') return;

  if (position === countOfSlides + 1) {
    goToSlide(1, true);
  }

  if (position === 0) {
    goToSlide(countOfSlides, true);
  }
});

function setInitialPosition () {
  goToSlide(position, true);
}

function restoreTransition () {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      slides.style.transition = 'transform 0.3s';
    });
  });
}

function goToSlide (newPosition, instant = false) {
  position = newPosition;

  if (instant) {
    slides.style.transition = 'none';
  }

  slides.style.transform = `translateX(${-position * 100}%)`;

  if (instant) {
    restoreTransition();
  }
}

//#endregion

//#region services cards paddings

const servicesCard = document.querySelector('.services-card');

function updateServicesCardOffset () {
  const height = servicesCard.offsetHeight;
  document.documentElement.style.setProperty(
    '--services-card-offset',
    `${height / 2}px`
  );
}

window.addEventListener('load', updateServicesCardOffset);
window.addEventListener('resize', updateServicesCardOffset);

//#endregion

//#region form

const form = document.getElementById('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  form.reset();
});

//#endregion

//#region theme-switching
const themeButton = document.querySelector('.theme-switcher');
const html = document.documentElement;

const savedTheme = localStorage.getItem('air-theme');

if (savedTheme === 'dark') {
  html.classList.add('dark');
}

themeButton.addEventListener('click', () => {
  const isDark = html.classList.toggle('dark');

  localStorage.setItem('air-theme', isDark ? 'dark' : 'light');
});
//#endregion
