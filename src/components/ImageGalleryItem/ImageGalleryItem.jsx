import {
  ImageGalleryItems,
  ImageGalleryImage,
} from './ImageGalleryItem.styled';

import { Gallery } from '../ImageGallery/ImageGallery.styled';

export default function ImageGalleryItem({ images, onClick }) {
  console.log(images);
  return (
    <Gallery>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItems key={id} onClick={onClick}>
            <ImageGalleryImage
              src={webformatURL}
              alt={tags}
              data-image={largeImageURL}
            />
          </ImageGalleryItems>
        );
      })}
    </Gallery>
  );
}
