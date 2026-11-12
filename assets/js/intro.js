(() => {
  'use strict';
  document.body.classList.add('js');
  const intro = document.querySelector('.intro');
  const video = document.querySelector('#wave');
  const text = document.querySelector('#typed-text');
  const replay = document.querySelector('.replay');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const message = "Hi, I'm Yutong Shen,\nan AI researcher.";
  let run = 0;
  let moving = false;
  let watchdog;
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function reveal(token, instant = false) {
    if (token !== run || moving) return;
    moving = true;
    clearTimeout(watchdog);
    intro.classList.add('settled');
    if (!instant) await wait(2600);
    if (token !== run) return;
    intro.classList.add('revealing');
    if (instant) {
      text.textContent = message;
    } else {
      intro.classList.add('typing');
      for (const character of message) {
        if (token !== run) return;
        text.textContent += character;
        await wait(character === ',' || character === '\n' ? 220 : 62);
      }
    }
    if (token !== run) return;
    intro.classList.remove('typing');
    intro.classList.add('complete');
    replay.hidden = false;
  }

  function start() {
    const token = ++run;
    moving = false;
    clearTimeout(watchdog);
    video.pause();
    intro.classList.add('resetting');
    intro.classList.remove('settled', 'revealing', 'typing', 'complete');
    intro.getBoundingClientRect();
    intro.classList.remove('resetting');
    text.textContent = '';
    replay.hidden = true;
    if (reducedMotion.matches) {
      video.currentTime = 0;
      reveal(token, true);
      return;
    }
    video.currentTime = 0;
    // Start travelling while the hand is still waving, never at a video boundary.
    video.ontimeupdate = () => {
      if (video.currentTime >= 1.2) reveal(token);
    };
    video.onerror = () => reveal(token);
    watchdog = setTimeout(() => reveal(token), 9000);
    video.play().catch(() => reveal(token));
  }
  replay.addEventListener('click', start);
  reducedMotion.addEventListener('change', start);
  start();
})();
