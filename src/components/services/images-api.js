// const axios = require('axios').default;

function fetchImages(nextName, nextPage) {
  return fetch(
    `https://pixabay.com/api/?q=${nextName}&page=${nextPage}&key=31897443-8d2d373622bb59a1b3cd97685&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    console.log(response);
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Немає даних з ім'ям ${nextName}`));
  });
}

const api = {
  fetchImages,
};

export default api;
