import { Component } from 'react';
import s from './Button.module.css';

export default class Button extends Component {
  render() {
    return (
      <button className={s.Button} onClick={this.props.loadMore} type="submit">
        Load more
      </button>
    );
  }
}
