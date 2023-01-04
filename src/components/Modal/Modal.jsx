import React, { Component } from 'react';
import { ModalWrapper, Overlay } from './Modal.styled';

class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.onEscapeClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapeClick);
  }

  onEscapeClick = event => {
    if (event.code === 'Escape') {
      this.props.onOpenModal();
    }
  };

  onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onOpenModal();
    }
  };

  render() {
    return (
      <Overlay onClick={this.onBackdropClick}>
        <ModalWrapper>
          <img src="" alt="" />
          <p>Це контент модального вікна!</p>
          <button type="button" onClick={this.onBackdropClick}>
            Закрити
          </button>
        </ModalWrapper>
      </Overlay>
    );
  }
}

export default Modal;
