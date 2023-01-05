import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import RejectedMessage from '../RejectedMessage/RejectedMessage';
import IdleMessage from '../IdleMessage/IdleMessage';
import Button from '../Button/Button';
import imagesApi from '../services/images-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    images: [],
    showModal: false,
    largeImage: '',
    error: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageNameValue;
    const nextName = this.props.imageNameValue;

    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });

      imagesApi
        .fetchImages(nextName, nextPage)
        .then(images =>
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            status: Status.RESOLVED,
          }))
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
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
  };

  render() {
    const { images, showModal, error, status } = this.state;

    if (status === Status.IDLE) {
      return <IdleMessage />;
    }

    if (status === Status.PENDING) {
      return <Loader />;
    }

    if (status === Status.REJECTED) {
      return <RejectedMessage message={error.message} />;
    }

    if (status === Status.RESOLVED) {
      return (
        <>
          <ImageGalleryItem images={images} onClick={this.toggleModal} />
          <Button onClick={this.props.onLoadMore} />
          {showModal && (
            <Modal
              onOpenModal={this.toggleModal}
              largeImage={this.state.largeImage}
            />
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
