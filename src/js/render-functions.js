import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
});

const refs = {
    container: document.querySelector(".gallery"),
    loader: document.querySelector(".loader"),
    loadmoreBtn: document.querySelector('.loadmore-btn'),
};

export function createGallery(images) {
  const markup = images.map(image => `
    <li>
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes</b><span>${image.likes}</span></p>
        <p><b>Views</b><span>${image.views}</span></p>
        <p><b>Comments</b><span>${image.comments}</span></p>
        <p><b>Downloads</b><span>${image.downloads}</span></p>
      </div>
    </li>
  `).join('');

  refs.container.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh(); 
}

export function clearGallery() {
  refs.container.innerHTML = '';
}

export  function showLoader() { 
  refs.loader.classList.remove('hidden');
}

export function hideLoader() {
  refs.loader.classList.add('hidden');
}

export function showLoadMoreButton() {
    refs.loadmoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
    refs.loadmoreBtn.classList.add('hidden');
}