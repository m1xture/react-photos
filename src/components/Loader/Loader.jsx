// import { Component } from "react";
import css from "./Loader.module.css";

// class Loader extends Component {
//   render() {
//     return (

//     );
//   }
// }
const Loader = () => {
  return (
    <div className={css["loader-block"]}>
      <span className={css.loader}></span>
    </div>
  );
};
export default Loader;
