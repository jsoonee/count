import { JSX } from "react";
import { create } from "zustand";

interface ModalStore {
  content: JSX.Element | null;
  openModal: (content: JSX.Element) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  content: null,
  openModal: (content) => set({ content: content }),
  closeModal: () => set({ content: null }),
}));

export default useModalStore;