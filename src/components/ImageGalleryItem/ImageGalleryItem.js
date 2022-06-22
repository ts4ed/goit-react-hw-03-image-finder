import { Component } from 'react';
import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  handleChange = () => {
    this.props.onClick();
  };

  render() {
    const { imageLink, imageAlt, largeImageURL } = this.props;
    return (
      <li className={s.ImageGalleryItem}>
        <img
          src={imageLink}
          alt={imageAlt}
          data-large={largeImageURL}
          className={s.ImageGalleryItem__image}
          onClick={this.handleChange}
        />
      </li>
    );
  }
}
