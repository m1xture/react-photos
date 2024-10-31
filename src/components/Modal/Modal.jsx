// import { Component } from "react";
import css from "./Modal.module.css";

// class Modal extends Component {
//   render() {
//     return (
//       <div className={css.overlay} onClick={this.props.closeModal} data-overlay>
//         <div className={css.modal}>
//           <img
//             className={css.modal__image}
//             src={this.props.path}
//             alt={this.props.desc}
//           />
//         </div>
//       </div>
//     );
//   }
// }

const Modal = ({ closeModal, path, desc }) => {
  return (
    <div className={css.overlay} onClick={closeModal} data-overlay>
      <div className={css.modal}>
        <img className={css.modal__image} src={path} alt={desc} />
      </div>
    </div>
  );
};

export default Modal;
