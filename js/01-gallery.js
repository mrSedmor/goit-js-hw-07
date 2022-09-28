import { galleryItems } from './gallery-items.js';

const galleryElem = document.querySelector('.gallery');

// Варіант №1
galleryElem.innerHTML = createGalleryMarkup(galleryItems);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
          </a>
        </div>`;
    })
    .join('');
}

// Варіант №2
// galleryElem.append(...createGalleryElements(galleryItems));

// function createGalleryElements(gallaryItems) {
//   return gallaryItems.map(({ preview, original, description }) => {
//     const itemElem = document.createElement('div');
//     itemElem.classList.add('gallery__item');

//     const linkElem = document.createElement('a');
//     linkElem.href = original;

//     const imageElem = document.createElement('img');
//     imageElem.classList.add('gallery__image');
//     imageElem.src = preview;
//     imageElem.dataset.source = original;
//     imageElem.alt = description;

//     linkElem.appendChild(imageElem);
//     itemElem.appendChild(linkElem);

//     return itemElem;
//   });
// }

galleryElem.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  const image = event.target;
  if (!image.classList.contains('gallery__image')) {
    return;
  }

  event.preventDefault();

  const source = image.dataset.source;
  const description = image.alt;

  // Варіант №1
  const lightboxMarkup = createLightboxMarkup({ source, description });

  const lightbox = basicLightbox.create(lightboxMarkup, {
    onShow: () => document.addEventListener('keydown', onEscapePressed),
    onClose: () => document.removeEventListener('keydown', onEscapePressed),
  });

  // Варіант №2.
  // const lightboxElement = createLightboxElement({ source, description });

  // const lightbox = basicLightbox.create(lightboxElement, {
  //   onShow: () => document.addEventListener('keydown', onEscapePressed),
  //   onClose: () => document.removeEventListener('keydown', onEscapePressed),
  // });

  lightbox.show();

  function onEscapePressed(event) {
    if (event.code !== 'Escape') {
      return;
    }

    lightbox.close();
  }
}

// Варіант №1
function createLightboxMarkup({ source, description }) {
  return `<img src="${source}" alt="${description}" />`;
}

// Варіант №2
// function createLightboxElement({ source, description }) {
//   const imageElem = document.createElement('img');
//   imageElem.src = source;
//   imageElem.alt = description;

//   const content = document.createElement('div');
//   content.appendChild(imageElem);

//   return content;
// }
