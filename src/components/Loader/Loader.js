import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';

export default class Loader extends Component {
  render() {
    return (
      <div className={s.Loader}>
        <ThreeDots color="grey" height={120} width={120} />
      </div>
    );
  }
}
