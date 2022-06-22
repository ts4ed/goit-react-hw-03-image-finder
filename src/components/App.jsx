import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import s from './App.module.css';
import PropTypes from 'prop-types';

export default class App extends Component {
  state = {
    request: '',
  };

  formSubmitHandler = request => {
    this.setState({ request });
  };

  render() {
    const { request } = this.state;
    const { formSubmitHandler } = this;
    return (
      <div className={s.App}>
        <Searchbar onSubmitData={formSubmitHandler} />
        <ImageGallery request={request} />
      </div>
    );
  }
}
App.propTypes = {
  request: PropTypes.string,
  formSubmitHandler: PropTypes.func,
};
