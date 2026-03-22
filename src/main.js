import { getImagesByQuery } from './js/pixabay-api.js'
import { createGallery } from './js/render-functions.js';
import { clearGallery } from './js/render-functions.js';
import { showLoader } from './js/render-functions.js';
import { hideLoader } from './js/render-functions.js';
import { showLoadMoreButton } from './js/render-functions.js';
import { hideLoadMoreButton } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.loadmore-btn');
let page;
let currentQuery;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = e.target.elements['search-text'].value.trim();
    currentQuery = query;
    page = 1;

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search term!' });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    const images = data.hits;

    if (images.length === 0) {
      iziToast.error({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 4000
      });
      return;
    }

    createGallery(images);
    const totalPages = Math.ceil(data.totalHits / 15);

        if (totalPages <= page) {
            hideLoadMoreButton();

            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight'
            });
        } else {
            showLoadMoreButton();
        }
    e.target.reset();

  } catch (error) { 
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again!',
      position: 'topRight',
      timeout: 4000
    });
  } finally { 
    hideLoader(); 
  }
});

loadMoreBtn.addEventListener('click', async () => {
    page += 1;

    showLoader();

    try {
        const data = await getImagesByQuery(currentQuery, page);
        const images = data.hits;

        createGallery(images);
        const totalPages = Math.ceil(data.totalHits / 15);

        if (totalPages <= page) {
            hideLoadMoreButton();

            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight'
            });
        } else {
            showLoadMoreButton();
        }

        const card = document.querySelector('.gallery li');
        const height = card.getBoundingClientRect().height;

        window.scrollBy({
            top: height * 2,
            behavior: 'smooth'
        });
    } catch(err){
        console.error(err);
    } finally {
        hideLoader();
    }
})
