import { JSX } from "react";
import { create } from "zustand";

interface ModalStore {
  content: JSX.Element | null;
  isEmojiOpen: boolean;
  openModal: (content: JSX.Element) => void;
  closeModal: () => void;
  setEmojiOpen: (open: boolean) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  content: null,
  isEmojiOpen: false,
  openModal: (content) => set({ content: content }),
  closeModal: () => set({ content: null }),
  setEmojiOpen: (open) => set({ isEmojiOpen: open }),
}));

export default useModalStore;
