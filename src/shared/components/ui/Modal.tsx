import "./Modal.css";

type ModalProps = {
  title: string;
  message: string;
  closeModal: () => void;
  onConfirm?: () => void;
  showCancel?: boolean;
  onCancel?: () => void;
};
const Modal = ({
  title,
  message,
  closeModal,
  onConfirm,
  showCancel = false,
  onCancel,
}: ModalProps) => {
  const handleClick = () => {
    closeModal();
    if (onConfirm) {
      onConfirm();
    }
  };
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-container">
        <div className="modal-content">{message}</div>
        <button className="modal-close" onClick={handleClick} aria-label="닫기">
          확인
        </button>
        {showCancel && (
          <button
            className="modal-close"
            onClick={handleCancel}
            aria-label="취소"
          >
            취소
          </button>
        )}
      </div>
    </div>
  );
};
export default Modal;
