import { JSX } from "react";
import { create } from "zustand";

interface ModalStore {
  content: JSX.Element | null;
  isEmojiOpen: boolean;
  submitted: boolean;
  openModal: (content: JSX.Element) => void;
  closeModal: () => void;
  setEmojiOpen: (open: boolean) => void;
  setSubmitted: (value: boolean) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  content: null,
  isEmojiOpen: false,
  submitted: false,
  openModal: (content) => set({ content: content }),
  closeModal: () => set({ content: null }),
  setEmojiOpen: (open) => set({ isEmojiOpen: open }),
  setSubmitted: (value) => set({submitted: value})
}));

export default useModalStore;
