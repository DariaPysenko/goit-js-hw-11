import './sass/main.scss';
import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { imgItems } from './imgItems';
import { options } from './imgItems';


const refs = {
  form: document.querySelector('#search-form'),
  btnLoadMore: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

const onFormInput = refs.form.elements.searchQuery;

refs.form.addEventListener('submit', onFormSubmit);
refs.btnLoadMore.addEventListener('click', onClickLoadMoreBtn);
let createMarkup;

///////////////////

async function onFormSubmit(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  options.pageNumber = 1;
  refs.btnLoadMore.classList.add('is-hidden');

  if (onFormInput.value.trim() === '') {
    Notify.info('You see photo');
  }
  try {
    const response = await imgItems(onFormInput.value);
    if (response.hits.length === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }
    Notify.info(`Hooray! We found ${response.totalHits} images.`);
    renderMarkup(response);

    createMarkup = new SimpleLightbox('.gallery a', {
      captions: true,
      captionSelector: 'img',
      captionsData: `alt`,
      captionDelay: 250,
    });
    if (response.totalHits < options.pageItemCount) {
      return;
    }

    options.pageNumber += 1;

    setTimeout(() => refs.btnLoadMore.classList.remove('is-hidden'), 500);
  } catch (error) {
    console.log('Error.', error);
  }
}
/////////////////////////////////////

async function onClickLoadMoreBtn() {
  try {
    btnDisabledTrue();
    const response = await imgItems(onFormInput.value);
    options.pageNumber += 1;
    renderMarkup(response);

    if (response.totalHits < options.pageNumber && options.pageItemCount < options.pageNumber) {
      refs.btnLoadMore.classList.add('is-hidden');
      return Notify.info("We're sorry, but you've reached the end of search results.");
    }
    btnDisabledFalse();
  } catch (error) {
    console.log(error);
  }
}
function btnDisabledTrue() {
  refs.btnLoadMore.setAttribute('disabled', true);
}
function btnDisabledFalse() {
  refs.btnLoadMore.removeAttribute('disabled');
}



//////////////render////////

// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.

function renderMarkup(array) {
  const arrayMarkup = array.hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
  <div class="photo-card">
    <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>likes ${likes}</b>
      </p>
      <p class="info-item">
        <b>views ${views}</b>
      </p>
      <p class="info-item">
        <b>comments ${comments}</b>
      </p>
      <p class="info-item">
        <b>downloads ${downloads}</b>
      </p>
    </div>
  </div>
`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', arrayMarkup);
}

// <div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>
