import { Component } from "react";
import img from "../../imgs/search-icon.svg";
import css from "./Searchbar.module.css";

class Searchbar extends Component {
  render() {
    return (
      <header className={css.header}>
        <div className={css["header-block"]}>
          <input
            type="text"
            placeholder="Search..."
            className={css.header__input}
            data-search-input
          />
          <img
            src={img}
            alt="search"
            onClick={this.props.searchPhotos}
            className={css.header__search}
          />
        </div>
      </header>
    );
  }
}

export default Searchbar;
