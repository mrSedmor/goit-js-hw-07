import { galleryItems } from './gallery-items.js';
// console.log(galleryItems);

const galleryNode = document.querySelector('.gallery');

galleryNode.innerHTML = galleryItems.map(createGalleryImageMarkup).join('');

function createGalleryImageMarkup({ preview, original, description }) {
  const markup = `
      <a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
      </a>`;
  return markup;
}

var lightbox = new SimpleLightbox('.gallery .gallery__item', {
  captionsData: 'alt',
  captionDelay: 250,
});
