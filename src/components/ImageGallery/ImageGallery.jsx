import React, { Component } from 'react';
import Modal from '../Modal/Modal';

class ImageGallery extends Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    return (
      <div>
        <button type="button" onClick={this.toggleModal}>
          Відкрити
        </button>
        {showModal && <Modal onOpenModal={this.toggleModal} />}
      </div>
    );
  }
}

export default ImageGallery;
