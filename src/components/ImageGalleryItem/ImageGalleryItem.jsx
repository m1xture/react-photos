import { Component } from "react";
import css from "./ImageGalleryItem.module.css";

class ImageGalleryItem extends Component {
  render() {
    return (
      <li className={css.gallery__item}>
        <img
          className={css.gallery__img}
          data-src={this.props.image.largeImageURL}
          src={this.props.image.webformatURL}
          alt={this.props.image.tags}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
