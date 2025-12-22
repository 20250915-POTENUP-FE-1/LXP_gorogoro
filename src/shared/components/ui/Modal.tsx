"use client";

import "./Modal.css";
import { Button } from "./index";

type ModalProps = {
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
  closeModal: () => void;
};

export default function Modal({
  title,
  message,
  onConfirm,
  onCancel,
  showCancel,
  closeModal,
}: ModalProps) {
  const handleClick = () => {
    closeModal();
    if (onConfirm) {
      onConfirm();
    }
  };
  const handleCancel = () => {
    closeModal();
    if (onCancel) {
      onCancel();
    }
  };
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-container">
        <div className="modal-content">{message}</div>
        <Button className="modal-close" onClick={handleClick} aria-label="확인">
          확인
        </Button>
        {showCancel && (
          <Button
            variant="outline"
            className="modal-close"
            onClick={handleCancel}
            aria-label="취소"
          >
            취소
          </Button>
        )}
      </div>
    </div>
  );
}
