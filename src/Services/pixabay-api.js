// export default function fetchPixabay(searchRequest, galleryPage) {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const KEY = '27923124-abae4833d2be49fca3c02a38e';
//   return fetch(
//     `${BASE_URL}?q=${searchRequest}&page=${galleryPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   );
// }
import axios from 'axios';

// import { http } from './api';
// import apiSettings from './settings';

const KEY = 'key=27923124-abae4833d2be49fca3c02a38e';
export default function fetchImages(searchRequest, galleryPage) {
  return axios.get(
    `https://pixabay.com/api/?${KEY}&q=${searchRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${galleryPage}&per_page=12`
  );
}

// export const http = {
//   get(url) {
//     return axios.get(url);
//   },
//   post(url, body) {
//     return axios.post(url, body);
//   },
// };

// export default settings;
