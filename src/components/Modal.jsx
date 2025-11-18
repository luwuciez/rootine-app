import { useRef, cloneElement, useEffect } from "react";
import "../App.css";

function Modal({ btnLabel, btnClassName, children, isOpen, onClose }) {
  const modalRef = useRef();

  function openModal() {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }

  function closeModal() {
    if (modalRef.current) {
      modalRef.current.close();
    }
    if (onClose) {
      onClose();
    }
  }

  // Handle programmatic opening
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.showModal();
    } else if (!isOpen && modalRef.current) {
      modalRef.current.close();
    }
  }, [isOpen]);

  // Pass closeModal function to children if they accept onClose prop
  const childrenWithProps = cloneElement(children, { onClose: closeModal });

  return (
    <>
      {btnLabel && (
        <button onClick={openModal} className={btnClassName}>
          {btnLabel}
        </button>
      )}

      <dialog ref={modalRef} className="modal">
        <button className="close-btn" onClick={closeModal}>
          ❌
        </button>
        {childrenWithProps}
      </dialog>
    </>
  );
}

export default Modal;
