import useModalStore from "@/stores/modal";
import React, { useEffect } from "react";

export default function Modal() {
  const { isEmojiOpen, setEmojiOpen, content, closeModal } = useModalStore(
    (state) => state
  );

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      if (isEmojiOpen) {
        setEmojiOpen(false);
      } else {
        closeModal();
      }
    }
  }

  useEffect(() => {
    function handleEscKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (isEmojiOpen) {
          setEmojiOpen(false);
        } else {
          closeModal();
        }
      }
    }
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  });

  return content ? (
    <div
      id="modal-overlay"
      className="fixed inset-0 flex justify-center z-1 items-center w-full h-full bg-black/50"
      onClick={handleOverlayClick}
    >
      <div id="modal-content" className="sm:max-w-[425px] bg-white rounded-lg">
        {content}
      </div>
    </div>
  ) : null;
}
