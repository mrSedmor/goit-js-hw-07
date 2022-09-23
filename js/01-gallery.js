import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

const galleryNode = document.querySelector('.gallery');

galleryNode.innerHTML = galleryItems.map(createGalleryImageMarkup).join('');

function createGalleryImageMarkup({ preview, original, description }) {
  const markup = `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
      </a>
    </div>`;
  return markup;
}

galleryNode.addEventListener('click', onGalleryClick);

function createLightboxMarkup({ source, description }) {
  return `<img src="${source}" alt="${description}" />`;
}

function onGalleryClick(event) {
  const image = event.target;
  if (!image.classList.contains('gallery__image')) {
    return;
  }

  event.preventDefault();

  const source = image.dataset.source;
  const description = image.alt;
  const lightboxMarkup = createLightboxMarkup({ source, description });

  const lightbox = basicLightbox.create(lightboxMarkup, {
    onShow: () => document.addEventListener('keydown', onEscapePressed),
    onClose: () => document.removeEventListener('keydown', onEscapePressed),
  });

  function onEscapePressed(event) {
    if (event.key !== 'Escape') {
      return;
    }

    lightbox.close();
  }

  lightbox.show();
}
