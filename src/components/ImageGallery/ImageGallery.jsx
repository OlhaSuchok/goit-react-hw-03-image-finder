import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    showModal: false,
    largeImage: '',
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
          .then(response => response.json())
          .then(images => this.setState({ images }))
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
    const { images, showModal, loading } = this.state;
    console.log(images);
    return (
      <div>
        {loading && <p>Завантаження...</p>}
        {images && (
          <ImageGalleryItem images={images.hits} onClick={this.toggleModal} />
        )}
        {showModal && (
          <Modal
            onOpenModal={this.toggleModal}
            largeImage={this.state.largeImage}
          />
        )}
      </div>
    );
  }
}

export default ImageGallery;
