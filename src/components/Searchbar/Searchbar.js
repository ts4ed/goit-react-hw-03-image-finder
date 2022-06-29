import { Component } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    searchRequest: '',
  };

  searchForm = e => {
    e.preventDefault();
    if (this.state.searchRequest.trim() === '') {
      alert('Введите запрос');
      return;
    }
    this.props.onSearch(this.state.searchRequest);
    this.setState({ searchRequest: '' });
    // console.log(this.state.searchRequest);
  };
  handleChangeInput = e => {
    this.setState({ searchRequest: e.currentTarget.value });
  };
  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.searchForm}>
          <button type="submit" className={s.SearchForm__button}>
            <span className="button-label">Search</span>
          </button>

          <input
            className={s.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChangeInput}
            value={this.state.search}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  searchForm: PropTypes.func,
  handleChangeInput: PropTypes.func,
  search: PropTypes.string,
};
