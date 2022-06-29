export default function fetchPixabay(nextName, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '27923124-abae4833d2be49fca3c02a38e';
  return fetch(
    `${BASE_URL}?q=${nextName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}
