import { Fragment } from "react";

import classes from "./Modal.module.css";

const BackDrop = () => {
  return <div className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return <Fragment>{ReactDOM.createPortal()}</Fragment>;
};

export default Modal;
