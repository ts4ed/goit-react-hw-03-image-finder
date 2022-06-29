import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

export default function ImageGallery({ images, handlePreview }) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          tags={tags}
          smallImage={webformatURL}
          largeImage={largeImageURL}
          onClickItem={() => {
            handlePreview(id);
          }}
        />
      ))}
    </ul>
  );
}
