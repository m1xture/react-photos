import { Component } from "react";
import css from "./Loadmore.module.css";

class Loadmore extends Component {
  render() {
    return (
      <button
        className={css.loadmore}
        onClick={this.props.updatePage}
        data-loadmore
      >
        Load more
      </button>
    );
  }
}

export default Loadmore;
