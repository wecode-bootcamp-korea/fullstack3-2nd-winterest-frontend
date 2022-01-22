import React from 'react';
import './Modal.css';

function Modal({ open, close, children }) {
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <button className="close" onClick={close}>
            &times;
          </button>
          {children}
        </section>
      ) : null}
    </div>
  );
}

export default Modal;
