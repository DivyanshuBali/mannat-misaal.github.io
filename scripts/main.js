'use strict';

const overlay = document.getElementById('ripple-overlay');
const landingImg = document.querySelector('.landing-img');
let activated = false;

landingImg.addEventListener('mouseenter', () => {
  if (activated) return;
  activated = true;

  overlay.classList.add('expanding');
  document.body.classList.add('dark');

  overlay.addEventListener('transitionend', () => {
    document.body.style.background = '#253b76';
    overlay.style.transition = 'none';
    overlay.classList.remove('expanding');
    overlay.style.clipPath = 'circle(150vw at 50% 50%)';
  }, { once: true });
});

