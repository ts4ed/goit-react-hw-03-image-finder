import axios from 'axios';

const KEY = 'key=27923124-abae4833d2be49fca3c02a38e';
export default function fetchImages(searchRequest, galleryPage) {
  return axios.get(
    `https://pixabay.com/api/?${KEY}&q=${searchRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${galleryPage}&per_page=12`
  );
}
