import { Component } from 'react';
import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    return (
      <li className={s.ImageGalleryItem}>
        <img
          src={this.props.imageLink}
          alt={this.props.imageAlt}
          data-large={this.props.largeImageURL}
          className={s.ImageGalleryItem__image}
        />
      </li>
    );
  }
}
