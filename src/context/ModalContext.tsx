import React, { createContext, useContext, useState } from "react";

interface IModalContext {
  modalId: number;
  setModalId: React.Dispatch<React.SetStateAction<number>>;
}

const ModalContext = createContext<IModalContext>({
  modalId: 0,
  setModalId: () => null,
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalId, setModalId] = useState<number>(0);

  return (
    <ModalContext.Provider value={{ modalId, setModalId }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
