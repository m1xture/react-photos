// import { Component } from "react";
import css from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ image }) => {
  return (
    <li className={css.gallery__item}>
      <img
        className={css.gallery__img}
        data-src={image.largeImageURL}
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  );
};

export default ImageGalleryItem;
