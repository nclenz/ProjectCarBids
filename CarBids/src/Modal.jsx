import { createPortal } from "react-dom";
import "./modal.css";

const Modal = ({ isModalOpen, children, onClose }) => {
  if (!isModalOpen) {
    return null;
  }
  return createPortal(
    <div>
      <div className="overlay"></div>
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
