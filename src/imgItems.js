import axios from 'axios';

export const options = { pageNumber: 1, pageItemCount: 40 };

async function imgItems(namePhoto) {
  const SEARCH_URL = 'https://pixabay.com/api/';
  const params = {
    params: {
      key: '25337317-59888a1a0f6f8628b75487f84',
      q: namePhoto,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: options.pageNumber,
      per_page: options.pageItemCount,
    },
  };

  const { data } = await axios.get(SEARCH_URL, params);
  return data;
}
export { imgItems };

// 40 фоток на 1 стр
// key - твой уникальный ключ доступа к API.
// q - термин для поиска. То, что будет вводить пользователь.
// image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
// orientation - ориентация фотографии. Задай значение horizontal.
// safesearch - фильтр по возрасту. Задай значение true.