'use client';

import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.css';

interface ModalCreateProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalCreate({ onClose, children }: ModalCreateProps) {
  const modalRoot = document.getElementById('modal-root')!;
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        {' '}
        {children}
        {/* {<NoteForm onClose={onClose} />} */}
      </div>
    </div>,
    modalRoot,
  );
}
