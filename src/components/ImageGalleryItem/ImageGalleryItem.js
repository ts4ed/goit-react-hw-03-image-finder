import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  id,
  tags,
  smallImage,
  largeImage,
  onClickItem,
}) {
  return (
    <li key={id} className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItem__image}
        alt={tags}
        src={smallImage}
        data-source={largeImage}
        onClick={() => {
          onClickItem(largeImage);
        }}
      />
    </li>
  );
}
