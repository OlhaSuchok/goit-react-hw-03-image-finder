import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import { GalleryWrapper } from './ImageGallery.styled';

class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    showModal: false,
    largeImage: '',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageNameValue;
    const nextName = this.props.imageNameValue;

    if (prevName !== nextName) {
      this.setState({ loading: true });

      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${nextName}&page=1&key=31897443-8d2d373622bb59a1b3cd97685&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(new Error(`Немає даних з ім'ям ${nextName}`));
          })
          .then(images => this.setState({ images }))
          .catch(error => this.setState({ error }))
          .finally(() => this.setState({ loading: false }));
      }, 1000);
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
    const { images, showModal, loading, error } = this.state;
    console.log(images);
    return (
      <GalleryWrapper>
        {loading && <p>Завантаження...</p>}
        {error && <p>{error.message}</p>}
        {images && (
          <ImageGalleryItem images={images.hits} onClick={this.toggleModal} />
        )}
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

export default ImageGallery;
