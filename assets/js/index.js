import {
  initLanguage,
  checkLoaded,
  setLanguage,
  sideElementsAnimation,
  booksAnimation,
  updateDesign,
  getLanguage,
} from './util.js';

const switchLanguageButton = document.querySelector('.language-button');
const html = document.querySelector('html');
const main = document.querySelector('main');
console.log(main?.complete);

// Set media queries
const mqlMobile = window.matchMedia('(max-width: 800px)');
const mqlDefault = window.matchMedia('(min-width: 801px)');

// Set the loader element
const loader = document.querySelector('.loader');

/** Sets main min-height so the full background image is visible (100% width, proportional height) */
function setMainHeightFromBackground() {
  const lang = getLanguage();
  const bgFile =
    lang === 'ru'
      ? 'comic_babooshka_background_ru.webp'
      : 'comic_babooshka_background_en.webp';
  const img = new Image();
  img.onload = () => {
    if (main && img.naturalWidth > 0) {
      const ratio = img.naturalHeight / img.naturalWidth;
      main.style.minHeight = `calc(100vw * ${ratio})`;
    }
  };
  img.src = `./assets/${bgFile}`;
}

// Set Language
initLanguage(html);

const startLoadingTime = Date.now();
window.addEventListener('load', () => {
  checkLoaded(startLoadingTime, loader, true, null, 'default');
});

window.addEventListener('DOMContentLoaded', async () => {
  setMainHeightFromBackground();
  updateDesign(mqlMobile.matches);

  if (main?.complete) {
    console.log('Height:', main.offsetHeight);
  } else {
    main?.addEventListener('load', () => {
      console.log('Height:', main.offsetHeight);
    });
  }

  //sideElementsAnimation();
  booksAnimation();
});

switchLanguageButton.addEventListener('click', () => {
  loader.style.display = 'flex';

  // Change Language
  setLanguage(html);

  setMainHeightFromBackground();
  updateDesign(mqlMobile.matches).then((result) => {
    checkLoaded(result.timestamp, loader, true, null, 'default');
  });

  //sideElementsAnimation();
  booksAnimation();
});
