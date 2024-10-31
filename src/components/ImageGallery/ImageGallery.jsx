// import { Component } from "react";
import css from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
// class ImageGallery extends Component {
//   render() {
//     return;
//   }
// }

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.gallery} onClick={openModal}>
      {images.map((imageObj) => (
        <ImageGalleryItem key={imageObj.id} image={imageObj} />
      ))}
    </ul>
  );
};
export default ImageGallery;
