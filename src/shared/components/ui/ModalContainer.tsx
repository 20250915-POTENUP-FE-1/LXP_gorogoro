"use client";

import { useModalStore } from "@/stores/useModalStore";
import Modal from "./Modal";

export default function ModalContainer() {
  const {
    isOpen,
    title,
    message,
    closeModal,
    onConfirm,
    onCancel,
    showCancel,
  } = useModalStore();

  if (!isOpen) return null;

  return (
    <Modal
      title={title}
      message={message}
      closeModal={closeModal}
      onConfirm={onConfirm}
      onCancel={onCancel}
      showCancel={showCancel}
    />
  );
}
