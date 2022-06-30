import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
// import s from './App.module.css';
// import PropTypes from 'prop-types';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import pixabayAPI from '../Services/pixabay-api';

const PER_PAGE = 12;

export default class App extends Component {
  state = {
    searchRequest: '',
    images: [],
    galleryPage: 1,
    error: null,
    isLoading: false,
    showModal: null,
    isVisible: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.searchRequest;
    const currentSearch = this.state.searchRequest;
    const prevGalleryPage = prevState.galleryPage;
    const currentGalleryPage = this.state.galleryPage;

    if (
      prevSearch !== currentSearch ||
      prevGalleryPage !== currentGalleryPage
    ) {
      this.updateImages();
    }
  }

  updateImages() {
    const { searchRequest, galleryPage } = this.state;
    this.setState({ isLoading: true });

    try {
      pixabayAPI(searchRequest, galleryPage).then(({ data }) => {
        const { totalHits, hits } = data;
        // console.log(hits);
        // console.log(Math.ceil(totalHits / PER_PAGE));
        if (!hits.length) {
          return alert('There is no images found with that search request');
        }
        const mappedImages = hits.map(
          ({ id, webformatURL, tags, largeImageURL }) => ({
            id,
            webformatURL,
            tags,
            largeImageURL,
          })
        );
        this.setState({
          images: [...this.state.images, ...mappedImages],
          isVisible: galleryPage < Math.ceil(totalHits / PER_PAGE),
        });
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleSearchSubmit = searchRequest => {
    this.setState({
      searchRequest,
      images: [],
      galleryPage: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      galleryPage: prevState.galleryPage + 1,
    }));
  };

  showModalImage = id => {
    const image = this.state.images.find(image => image.id === id);
    this.setState({
      showModal: {
        largeImageURL: image.largeImageURL,
        tags: image.tags,
      },
    });
  };

  closeModalImage = () => {
    this.setState({ showModal: null });
  };

  render() {
    const { images, isLoading, error, isVisible, showModal } = this.state;
    // console.log(isVisible);
    return (
      <>
        <Searchbar onSearch={this.handleSearchSubmit} />
        {error && alert(`Whoops, something went wrong: ${error.message}`)}
        {isLoading && <Loader color={'#3f51b5'} size={32} />}
        {images.length > 0 && (
          <ImageGallery images={images} handlePreview={this.showModalImage} />
        )}
        {isVisible && !error && <Button loadMore={this.loadMore} />}

        {showModal && (
          <Modal
            lgImage={showModal.largeImageURL}
            tags={showModal.tags}
            closeModal={this.closeModalImage}
          />
        )}
      </>
    );
  }
}
