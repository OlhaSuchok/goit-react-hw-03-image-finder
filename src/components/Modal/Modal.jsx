import PropTypes from 'prop-types';
import { ModalWrapper, Overlay } from './Modal.styled';

export function Modal({ onOpen }) {
  return (
    <Overlay class="overlay">
      <ModalWrapper class="modal">
        <img src="" alt="" />
        <p>Це контент модального вікна!</p>
        <button type="button" onClick={onOpen}>
          Закрити
        </button>
      </ModalWrapper>
    </Overlay>
  );
}
