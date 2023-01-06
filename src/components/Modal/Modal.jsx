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
      this.props.onOpenModal(event);
    }
  };

  render() {
    const { largeImage, tag } = this.props;
    return (
      <Overlay onClick={this.onBackdropClick}>
        <ModalWrapper>
          <img src={largeImage} alt={tag} />
        </ModalWrapper>
      </Overlay>
    );
  }
}

export default Modal;
