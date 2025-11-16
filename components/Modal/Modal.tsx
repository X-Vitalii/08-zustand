'use client';

import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { useEffect } from 'react';

interface ModalDetailsProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalDetailsProps) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        {children}
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          Close
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
