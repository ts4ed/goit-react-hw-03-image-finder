import { Component } from 'react';
// import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import s from './App.module.css';
export default class App extends Component {
  state = {
    request: '',
  };

  formSubmitHandler = request => {
    this.setState({ request });

    // this.setState(({ contacts }) => ({
    //     contacts: [data, ...contacts],
    // }));
  };

  render() {
    return (
      <div className={s.App}>
        {/* <Loader /> */}
        <Searchbar onSubmitData={this.formSubmitHandler} />
        {/* <ImageGallery />
      // 
      
      <Button />
      <Modal /> */}
        <ImageGallery request={this.state.request} />
      </div>
    );
  }
}
