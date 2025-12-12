import { create } from "zustand";

type ModalOptions = {
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
};

type ModalState = {
  isOpen: boolean;
} & ModalOptions;

type ModalActions = {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState & ModalActions>((set) => ({
  isOpen: false,
  title: "",
  message: "",
  onConfirm: undefined,
  onCancel: undefined,
  showCancel: false,

  openModal: (options) =>
    set({
      isOpen: true,
      ...options,
      showCancel: options.showCancel ?? false,
    }),

  closeModal: () => set((state) => ({
    ...state,
    isOpen: false,
    onConfirm: undefined,
    onCancel: undefined,
  })),
}));
