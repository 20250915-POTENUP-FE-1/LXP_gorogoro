"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import Modal from "./Modal";

type ModalOptions = {
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
};
type ModalContextValue = {
  openModal: (options: ModalOptions) => void;
  closeModal?: () => void;
};

export const ModalContext = createContext<ModalContextValue | undefined>(
  undefined
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalOptions & { isOpen: boolean }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: undefined,
    onCancel: undefined,
    showCancel: false,
  });

  const openModal = (options: ModalOptions) => {
    setModal({
      isOpen: true,
      title: options.title,
      message: options.message,
      onConfirm: options.onConfirm,
      onCancel: options.onCancel,
      showCancel: options.showCancel ?? false,
    });
  };
  const closeModal = () => setModal((prev) => ({ ...prev, isOpen: false }));
  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modal.isOpen && (
        <Modal
          title={modal.title}
          message={modal.message}
          closeModal={closeModal}
          onConfirm={modal.onConfirm}
          onCancel={modal.onCancel}
          showCancel={modal.showCancel}
        ></Modal>
      )}
    </ModalContext.Provider>
  );
};
export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("Modal 에러");
  }
  return ctx;
};
