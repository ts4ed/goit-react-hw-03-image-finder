import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import pixabayAPI from '../../Services/pixabay-api';
import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    page: 1,
    search: '',
    images: null,
    error: null,
    status: 'idle',
    showModal: false,
    data: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const KEY = '27923124-abae4833d2be49fca3c02a38e';
    const PAGE = this.state.page;
    const PER_PAGE = '12';
    const REQUEST = this.props.request;
    if (prevProps.request !== this.props.request) {
      if (REQUEST !== '') {
        this.setState({ status: 'panding', page: 1, images: null });
        pixabayAPI(REQUEST, PAGE, KEY, PER_PAGE)
          .then(images => this.setState({ images, status: 'resolved' }))
          .catch(error => this.setState({ error, status: 'rejected' }));
      }
    }
    if (prevState.page + 1 === this.state.page) {
      pixabayAPI(REQUEST, PAGE, KEY, PER_PAGE).then(images =>
        this.setState({
          images: [...prevState.images, ...images],
        })
      );
    }
  }

  toggleModal = e => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  hiddenModal = () => {
    this.setState({ showModal: false });
  };

  showModalImage = id => {
    const image = this.state.images.find(image => image.id === id);
    this.setState({
      data: {
        largeImageURL: image.largeImageURL,
        tags: image.tags,
      },
    });
    this.toggleModal();
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { hiddenModal, loadMore } = this;
    const imgs = this.state.images;
    const { request } = this.props;
    const { status, showModal, toggleModal, data } = this.state;

    if (status === 'panding') {
      return <Loader />;
    }
    if (status === 'rejected' || (imgs && imgs.length === 0)) {
      return (
        <div className={s.Error}>
          Что то пошло не так. Ваш запрос "{request}" не найден
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className={s.Button}>
          {showModal && (
            <Modal
              onClick={toggleModal}
              lgImage={data.largeImageURL}
              tags={data.tags}
              hiddenModal={hiddenModal}
            />
          )}
          <ul className={s.ImageGallery}>
            {imgs.map(image => (
              <ImageGalleryItem
                key={image.id}
                imageLink={image.webformatURL}
                imageAlt={image.tags}
                largeImageURL={image.largeImageURL}
                onClick={() => this.showModalImage(image.id)}
              />
            ))}
          </ul>
          <Button loadMore={loadMore} />
        </div>
      );
    }
  }
}
