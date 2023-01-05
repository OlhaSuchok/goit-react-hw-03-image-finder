import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import RejectedMessage from '../RejectedMessage/RejectedMessage';
import IdleMessage from '../IdleMessage/IdleMessage';
import imagesApi from '../services/images-api';

import { GalleryWrapper } from './ImageGallery.styled';

class ImageGallery extends Component {
  state = {
    images: null,
    showModal: false,
    largeImage: '',
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageNameValue;
    const nextName = this.props.imageNameValue;

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });

      imagesApi
        .fetchImages(nextName)
        .then(images => this.setState({ images, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  toggleModal = event => {
    const { showModal } = this.state;
    if (showModal) {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
      }));
    }
    if (event.target.nodeName !== 'IMG') {
      return;
    }
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImage: event.target.dataset.image,
    }));

    console.log(event.target.dataset.image);
    console.log(event.target.nodeName);
  };

  render() {
    const { images, showModal, error, status } = this.state;
    // const { imageNameValue } = this.props;
    console.log(images);

    if (status === 'idle') {
      return <IdleMessage />;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <RejectedMessage message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <GalleryWrapper>
          <ImageGalleryItem images={images} onClick={this.toggleModal} />
          {showModal && (
            <Modal
              onOpenModal={this.toggleModal}
              largeImage={this.state.largeImage}
            />
          )}
        </GalleryWrapper>
      );
    }
  }
}

export default ImageGallery;
