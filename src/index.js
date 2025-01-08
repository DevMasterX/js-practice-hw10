import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const selectElement = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

selectElement.innerHTML = `
    <option value=''>Select a cat breed 😸</option>
    `;

fetchBreeds()
  .then(breeds => {
    addBreedsToSelect(selectElement, createOptionsMarkup(breeds));
  })
  .catch(error => console.log(error));

selectElement.addEventListener('change', onSelectChange);

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
  selectElement.style.display = 'none';
  loader.textContent = 'Loading data, please wait...';
  const id = evt.target.value;
  // const id = 1;

  fetchCatByBreed(id)
    .then(data => {
      const breed = {
        imageUrl: data.url,
        name: data.breeds[0].name,
        description: data.breeds[0].description,
        temperament: data.breeds[0].temperament,
      };

      createBreedMarkup(breed);
      selectElement.style.display = 'block';
    })
    .catch(error => {
      console.log(error);
      errorEl.textContent =
        'Oops! Something went wrong! Try reloading the page!';
    })
    .finally(() => {
      loader.textContent = '';
    });
}

function createBreedMarkup({ imageUrl, name, description, temperament }) {
  catInfo.innerHTML = `<div class="image-container">
                          <img class="breed-image" alt=${name} src=${imageUrl}>
                        </div>
                        <div class="breed-container">
                          <h2 class="breed-name"> ${name}</h2>
                          <p class="breed-temperament"> ${temperament}</p>
                          <p class="breed-description"> ${description}</p>
                        </div>
                    
                    `;

  // Устанавливаем фоновое изображение с плавным переходом
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
