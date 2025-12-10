import "./Modal.css";

type ModalProps = {
  title: string;
  message: string;
  closeModal: () => void;
  onConfirm?: () => void;
};
const Modal = ({ title, message, closeModal, onConfirm }: ModalProps) => {
  const handleClick = () => {
    closeModal();
    if (onConfirm) {
      onConfirm();
    }
  };
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-container">
        <div className="modal-header">모달</div>
        <div className="modal-content">{message}</div>
        <button className="modal-close" onClick={handleClick} aria-label="닫기">
          확인
        </button>
      </div>
    </div>
  );
};
export default Modal;
