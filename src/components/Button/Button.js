// import { Component } from 'react';
import s from './Button.module.css';

export default function Button({ loadMore }) {
  return (
    <div className={s.cont}>
      <button className={s.Button} onClick={loadMore} type="submit">
        Load more
      </button>
    </div>
  );
}
