function fetchImages(nextName) {
  return fetch(
    `https://pixabay.com/api/?q=${nextName}&page=1&key=31897443-8d2d373622bb59a1b3cd97685&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
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
