import { Component } from 'react';
import s from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = el => {
    if (el.code === 'Escape') {
      this.props.hiddenModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.hiddenModal();
    }
  };

  render() {
    const { handleBackdropClick } = this;
    const { lgImage, tags } = this.props;
    return (
      <div className={s.Overlay} onClick={handleBackdropClick}>
        <div className={s.Modal}>
          <img src={lgImage} alt={tags} />
        </div>
      </div>
    );
  }
}
