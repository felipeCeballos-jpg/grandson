import { updateImages } from './image.js';
import { INITIAL_LANGUAGE } from './constant.js';

export function initLanguage(html) {
  const language = localStorage.getItem('language');

  if (!language) {
    localStorage.setItem('language', INITIAL_LANGUAGE);
    html.lang = INITIAL_LANGUAGE;
    return;
  }

  if (language !== 'ru' && language !== 'en') {
    localStorage.setItem('language', INITIAL_LANGUAGE);
    html.lang = INITIAL_LANGUAGE;
    return;
  }

  html.lang = language;
}

export function setLanguage(html) {
  const currentLang = html.lang === 'ru' ? 'en' : 'ru';

  localStorage.setItem('language', currentLang);
  html.lang = currentLang;
}

export function getLanguage() {
  const language = localStorage.getItem('language');
  return language || INITIAL_LANGUAGE;
}

export function checkLoaded(
  startTime,
  loaderElement,
  delayLoadingPage = false,
  animationFn = null,
  loaderType = 'default',
) {
  if (loaderType === 'default') {
    const loaderImg = loaderElement.querySelector('.loader-img');

    if (loaderImg) {
      loaderImg.src = './assets/loading.GIF';
    }
  }

  const maxLoadingTime = 2500; // 2.5 seconds
  const elapsedTime = Date.now() - startTime;

  const timeRemaining = maxLoadingTime - elapsedTime;

  if (delayLoadingPage && elapsedTime < maxLoadingTime) {
    setTimeout(() => {
      loaderElement.style.display = 'none';
      if (animationFn) animationFn();
    }, timeRemaining);
  } else {
    loaderElement.style.display = 'none';
    if (animationFn) animationFn();
  }
}

/* Update Design */
export async function updateDesign(isMobile = false) {
  try {
    // Get current language
    const currentLanguage = getLanguage();

    //updateText(currentLanguage);
    const result = await updateImages(currentLanguage);

    if (!result.success) {
      console.warm(
        `Some images failed to load (${result.imagesLoaded}/${result.totalImages})`,
      );
    }

    return result;
  } catch (error) {
    console.error('Failed to update images:', error);
    throw error;
  }
}

// Image loading utility that returns a promise and handles errors
export function loadImage(image, src) {
  return new Promise((resolve) => {
    if (!src) {
      console.warn(`Missing source for image: `, image);
      resolve(false);
      return;
    }

    image.src = src;
    image.onload = () => resolve(true);
    image.onerror = (error) => {
      console.error('Error loading image: ', { src, error });
      resolve(false);
    };
  });
}

export function sideElementsAnimation() {
  resetAnimation([
    { selector: '.scroll-action-left', animationClass: 'scroll-active-left' },
  ]);

  const elementsToAnimate = [{ selector: '.scroll-action-left', side: 'left' }];

  elementsToAnimate.forEach(({ selector, side }) => {
    document.querySelectorAll(selector).forEach((item) => {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(`scroll-active-${side}`);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '0px',
          threshold: 0,
        },
      );

      observer.observe(item);
    });
  });
}

export function booksAnimation() {
  resetAnimation([{ selector: '.menu', animationClass: 'menu-active' }]);

  const footer = document.querySelector('.section-navbook');
  const books = document.querySelector('.menu');
  const booksObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          books.classList.add('menu-active');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px',
      threshold: 0.6,
    },
  );

  booksObserver.observe(footer);
}

export function resetAnimation(elements) {
  if (elements.length === 0) return;

  elements.forEach(({ selector, animationClass }) => {
    const element = document.querySelector(selector);
    if (element.classList.contains(animationClass)) {
      element.classList.remove(animationClass);
    }
  });
}
