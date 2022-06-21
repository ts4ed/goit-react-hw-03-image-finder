import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import { Component } from 'react';

export default class ImageGallery extends Component {
  state = {
    page: '1',
    search: '',
    images: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.request !== this.props.request) {
      const KEY = '27923124-abae4833d2be49fca3c02a38e';
      const PAGE = this.state.page;
      const PER_PAGE = '12';
      const REQUEST = this.props.request;
      console.log(REQUEST);
      if (REQUEST !== '') {
        fetch(
          `https://pixabay.com/api/?q=${REQUEST}&page=${PAGE}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
        )
          .then(res => res.json())
          .then(respons => respons.hits)
          .then(images => this.setState({ images }));
      }
    }
  }
  render() {
    const imgs = this.state.images;

    return (
      <ul className={s.ImageGallery}>
        {imgs &&
          imgs.map(image => (
            <ImageGalleryItem
              key={image.id}
              imageLink={image.webformatURL}
              imagAlt={image.tags}
              largeImageURL={image.largeImageURL}
            />
          ))}
      </ul>
    );
  }
}

/* <>
  <ImageGalleryItem itemsGallery={this.state.images} />
</>; */
