'use client';

import './Modal.css';

type ModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onCancel?: () => void;
};

export default function NewModal({ isOpen, title, message, onCancel }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-container">
        <div className="modal-content">{message}</div>
        {onCancel && (
          <button className="modal-close" onClick={onCancel} aria-label="취소">
            확인
          </button>
        )}
      </div>
    </div>
  );
}
