export default function fetchPixabay(request, page, key, per_page) {
  return fetch(
    `https://pixabay.com/api/?q=${request}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  )
    .then(res => res.json())
    .then(respons => respons.hits);
}
