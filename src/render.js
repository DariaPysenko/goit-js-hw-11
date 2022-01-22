export function renderMarkup(array) {
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

export { renderMarkup };