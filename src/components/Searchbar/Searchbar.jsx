import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SearchBar,
  SearchForm,
  SearchFormInput,
  SearchFormButton,
  SearchFormButtonLabel,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    imageNameValue: '',
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imageNameValue.trim() === '') {
      toast.warn("Введіть ім'я параметра у пошуку!");
      return;
    }
    this.props.onFormSearchSubmit(this.state.imageNameValue);
    this.setState({ imageNameValue: '' });
  };

  handleNameChange = event => {
    console.log(event.currentTarget.value);
    this.setState({ imageNameValue: event.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
            value={this.state.imageNameValue}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}

export default Searchbar;
