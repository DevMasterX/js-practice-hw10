import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';
axios.defaults.headers.common['x-api-key'] =
  'live_LOZ5JQyh4UK3FAeNUMFWc4HHTdIiQ03XwsDk9x0Zh8ot4grNmgQ6tDHacxncGHiH';

function fetchBreeds() {
  return axios
    .get('breeds')
    .then(response => response.data)
    .catch(() => {
      Notiflix.Notify.failure(
        `❌ OOPS! Something went wrong! Try reloading the page`,
        {
          width: '30%',
          clickToClose: true,
          fontSize: '16px',
        }
      );
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(() => {
      Notiflix.Notify.failure(
        `❌ OOPS! Something went wrong! Try reloading the page`,
        {
          width: '30%',
          clickToClose: true,
          fontSize: '16px',
        }
      );
    });
}

export { fetchBreeds, fetchCatByBreed };
