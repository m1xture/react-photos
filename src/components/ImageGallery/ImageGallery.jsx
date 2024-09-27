import { Component } from "react";
import css from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.gallery} onClick={this.props.openModal}>
        {this.props.images.map((imageObj) => (
          <ImageGalleryItem key={imageObj.id} image={imageObj} />
        ))}
      </ul>
    );
  }
}
export default ImageGallery;
