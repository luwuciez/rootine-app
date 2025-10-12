import { useRef } from "react";
import "../App.css";

function Modal({ btnLabel, btnClassName, children }) {
  const modalRef = useRef();

  function openModal() {
    modalRef.current.showModal();
  }

  function closeModal() {
    modalRef.current.close();
  }

  return (
    <>
      <button onClick={openModal} className={btnClassName}>
        {btnLabel}
      </button>

      <dialog ref={modalRef} className="modal">
        <button className="close-btn" onClick={closeModal}>
          ×
        </button>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
