import { Component } from "react";
import css from "./Loadmore.module.css";

class Loadmore extends Component {
  render() {
    return (
      <button className={css.loadmore} onClick={this.props.updatePage}>
        Load more
      </button>
    );
  }
}

export default Loadmore;
