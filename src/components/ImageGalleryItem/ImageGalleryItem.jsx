import {
  ImageGalleryItems,
  ImageGalleryImage,
} from './ImageGalleryItem.styled';

import { Gallery } from '../ImageGallery/ImageGallery.styled';

export default function ImageGalleryItem({ images }) {
  return (
    <Gallery>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItems key={id}>
            <ImageGalleryImage src={webformatURL} alt={tags} />
          </ImageGalleryItems>
        );
      })}
    </Gallery>
  );
}
