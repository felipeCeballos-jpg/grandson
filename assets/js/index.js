import {
  initLanguage,
  checkLoaded,
  setLanguage,
  sideElementsAnimation,
  booksAnimation,
  updateDesign,
  setMainHeightFromBackground,
} from './util.js';

const switchLanguageButton = document.querySelector('.language-button');
const html = document.querySelector('html');
const main = document.querySelector('main');
const playVideo = document.querySelector('.video-play-button');
const pauseVideo = document.querySelector('.video-pause-button');
const fullScreenVideo = document.querySelector('.video-full-screen-button');
const video = document.querySelector('.video-element');

// Set media queries
const mqlMobile = window.matchMedia('(max-width: 800px)');
const mqlDefault = window.matchMedia('(min-width: 801px)');

// Set the loader element
const loader = document.querySelector('.loader');

// Set Language
initLanguage(html);

const startLoadingTime = Date.now();
window.addEventListener('load', () => {
  checkLoaded(startLoadingTime, loader, true, null, 'default');
});

window.addEventListener('DOMContentLoaded', async () => {
  await setMainHeightFromBackground(main, mqlMobile.matches);
  updateDesign(mqlMobile.matches);

  if (main?.complete) {
  } else {
    main?.addEventListener('load', () => {
    });
  }

  sideElementsAnimation();
  booksAnimation();
});

mqlMobile.addEventListener('change', async (e) => {
  loader.style.display = 'flex';

  await setMainHeightFromBackground(main, e.matches);
  updateDesign(e.matches).then((result) => {
    checkLoaded(result.timestamp, loader, true, null, 'default');
  });
});

switchLanguageButton.addEventListener('click', async () => {
  loader.style.display = 'flex';

  // Change Language
  setLanguage(html);

  await setMainHeightFromBackground(main, mqlMobile.matches);
  updateDesign(mqlMobile.matches).then((result) => {
    checkLoaded(result.timestamp, loader, true, null, 'default');
  });

  sideElementsAnimation();
  booksAnimation();
});

pauseVideo.classList.add('hidden-btn');

playVideo.addEventListener('click', () => {
  playVideo.classList.add('hidden-btn');
  pauseVideo.classList.remove('hidden-btn');

  // play video
  video.play();
});

pauseVideo.addEventListener('click', () => {
  pauseVideo.classList.add('hidden-btn');
  playVideo.classList.remove('hidden-btn');

  // pause video
  video.pause();
});

fullScreenVideo.addEventListener('click', (e) => {
  e.stopPropagation();

  // full screen video
  video.requestFullscreen();
});
