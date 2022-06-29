import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
// import s from './App.module.css';
// import PropTypes from 'prop-types';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import pixabayAPI from '../Services/pixabay-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    request: '',
    page: 1,
    search: '',
    images: null,
    error: null,
    status: 'idle',
    showModal: false,
    data: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.request;
    const nextName = this.state.request;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING, page: 1, images: null });
      this.fetchImages(nextName, nextPage);
    }
    if (prevPage !== nextPage) {
      this.fetchImages(nextName, nextPage);
    }
  }

  fetchImages(nextName, nextPage) {
    pixabayAPI(nextName, nextPage)
      .then(data => {
        this.setState(prevState => {
          return {
            prevState,
            images: [...prevState.images, ...data.hits],
            status: Status.RESOLVED,
            imageSearch: nextName,
          };
        });

        if (this.prevPage !== nextPage) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  }

  toggleModal = largeImageURL => {
    this.setState(({ showModal, biggerImage }) => ({
      showModal: !showModal,
      biggerImage: largeImageURL,
    }));
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

  formSubmitHandler = request => {
    this.setState({ request });
  };

  render() {
    const { hiddenModal, loadMore } = this;
    const imgs = this.state.images;
    const { request } = this.props;
    const { status, showModal, toggleModal, data } = this.state;

    if (status === Status.PENDING) {
      return <Loader />;
    }
    if (status === Status.REJECTED || (imgs && imgs.length === 0)) {
      return (
        <div className={s.Error}>
          Что то пошло не так. Ваш запрос "{request}" не найден
        </div>
      );
    }
    if (status === Status.RESOLVED) {
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
          {imgs.length >= 12 && <Button loadMore={loadMore} />}
        </div>
      );
    }
  }
}
