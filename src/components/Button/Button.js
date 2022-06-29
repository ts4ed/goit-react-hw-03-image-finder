// import { Component } from 'react';
import s from './Button.module.css';

export default function Button({ loadMore }) {
  return (
    <button className={s.Button} onClick={loadMore} type="submit">
      Load more
    </button>
  );
}
