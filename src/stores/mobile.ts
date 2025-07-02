import { create } from "zustand";

interface MobileStore {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
  isOpenSidebar: boolean;
  setIsOpenSidebar: (value: boolean) => void;
}

const isMobile = window.innerWidth < 768;

const useMobileStore = create<MobileStore>((set) => ({
  isMobile: isMobile,
  setIsMobile: (value) => set({ isMobile: value }),
  isOpenSidebar: !isMobile,
  setIsOpenSidebar: (value) => set({ isOpenSidebar: value }),
}));

function handleResize() {
  useMobileStore.getState().setIsMobile(window.innerWidth < 768);
}

window.addEventListener("resize", handleResize);

handleResize();

export default useMobileStore;
