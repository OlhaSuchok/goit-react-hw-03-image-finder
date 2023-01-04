import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    imageNameValue: '',
  };

  handleFormSearchSubmit = imageNameValue => {
    console.log(imageNameValue);
    this.setState({ imageNameValue });
  };

  render() {
    return (
      <div>
        <Searchbar onFormSearchSubmit={this.handleFormSearchSubmit} />
        <ImageGallery />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
