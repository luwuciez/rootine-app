import { useRef, cloneElement } from "react";
import "../App.css";

function Modal({ btnLabel, btnClassName, children }) {
  const modalRef = useRef();

  function openModal() {
    modalRef.current.showModal();
  }

  function closeModal() {
    modalRef.current.close();
  }

  // Pass closeModal function to children if they accept onClose prop
  const childrenWithProps = cloneElement(children, { onClose: closeModal });

  return (
    <>
      <button onClick={openModal} className={btnClassName}>
        {btnLabel}
      </button>

      <dialog ref={modalRef} className="modal">
        <button className="close-btn" onClick={closeModal}>
          ×
        </button>
        {childrenWithProps}
      </dialog>
    </>
  );
}

export default Modal;
