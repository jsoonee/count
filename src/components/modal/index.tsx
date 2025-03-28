import useModalStore from "@/stores/modal";
import React from "react";

export default function Modal() {
  const { content, closeModal } = useModalStore();

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return content ? (
    <div
      id="modal-overlay"
      className="fixed inset-0 flex justify-center z-1 items-center w-full h-full bg-black/50"
      onClick={handleOverlayClick}
    >
      <div
        id="modal-content"
        className="p-[1.5rem] sm:max-w-[425px] bg-white rounded-lg"
      >
        {content}
      </div>
    </div>
  ) : null;
}
