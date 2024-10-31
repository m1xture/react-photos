// import { Component } from "react";
import css from "./Loadmore.module.css";

// class Loadmore extends Component {
//   render() {
//     return (

//     );
//   }
// }

const Loadmore = ({ updatePage }) => {
  return (
    <button className={css.loadmore} onClick={updatePage} data-loadmore>
      Load more
    </button>
  );
};

export default Loadmore;
