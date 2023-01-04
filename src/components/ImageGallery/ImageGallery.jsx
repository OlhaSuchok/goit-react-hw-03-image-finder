import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    images: null,
    loading: null,
    showModal: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    setTimeout(() => {
      fetch(
        'https://pixabay.com/api/?q=cat&page=1&key=31897443-8d2d373622bb59a1b3cd97685&image_type=photo&orientation=horizontal&per_page=12'
      )
        .then(response => response.json())
        .then(images => this.setState({ images }))
        .finally(() => this.setState({ loading: false }));
    }, 1000);
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, showModal, loading } = this.state;
    console.log(images);
    return (
      <div>
        <button type="button" onClick={this.toggleModal}>
          Відкрити
        </button>
        {loading && <p>Завантаження...</p>}
        {/* {images && <ImageGalleryItem />} */}
        {images && <p>Тут буде розмітка з картинками!!</p>}
        <ImageGalleryItem images={images} />
        {showModal && <Modal onOpenModal={this.toggleModal} />}
      </div>
    );
  }
}

export default ImageGallery;
