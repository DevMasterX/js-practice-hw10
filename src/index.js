import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const selectElement = document.querySelector('.breed-select');

selectElement.addEventListener('change', onSelectChange);

fetchBreeds()
  .then(breeds => {
    addBreedsToSelect(selectElement, createOptionsMarkup(breeds));
  })
  .catch(error => console.log(error));

function createOptionsMarkup(cats) {
  return cats
    .map(({ id, name }) => {
      return `
    <option value='${id}'>${name}</option>
    `;
    })
    .join('');
}

function addBreedsToSelect(selectEl, options) {
  selectEl.insertAdjacentHTML('beforeend', options);
}

function onSelectChange(evt) {
  const id = evt.target.value;
  fetchCatByBreed(id).then(response => console.log(response));
}

// const headers = new Headers({
//   'Content-Type': 'application/json',
//   'x-api-key':
//     'live_LOZ5JQyh4UK3FAeNUMFWc4HHTdIiQ03XwsDk9x0Zh8ot4grNmgQ6tDHacxncGHiH',
// });

// const requestOptions = {
//   method: 'GET',
//   headers: headers,
//   redirect: 'follow',
// };

// const BASE_URL = 'https://api.thecatapi.com/v1/';

// fetch(`${BASE_URL}breeds`, requestOptions)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   })
//   .then(cats => {
//     console.log(cats);
//     cats.forEach(cat => console.log(cat.name));
//   })
//   .catch(error => console.log(error));
