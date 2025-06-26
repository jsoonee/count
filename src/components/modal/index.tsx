import { TablerX } from "@/lib/Icons";
import useConfigStore from "@/stores/config";
import useModalStore from "@/stores/modal";
import { buttonSidebarMenuHoverColors } from "@/styles/colors";
import React, { useEffect } from "react";

export default function Modal() {
  const { isEmojiOpen, setEmojiOpen, content, closeModal } = useModalStore(
    (state) => state
  );
  const color = useConfigStore((state) => state.color);

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
      className="fixed inset-0 flex justify-center z-3 items-center w-full h-full bg-black/50"
      onClick={handleOverlayClick}
    >
      <div
        id="modal-content"
        className="relative sm:max-w-[425px] border-1 dark:border-[#222] bg-white dark:bg-black rounded-lg"
      >
        <button
          className={`absolute end-0 p-1 m-2 rounded-sm ${buttonSidebarMenuHoverColors[color]}`}
          onClick={() => closeModal()}
        >
          <TablerX className="size-5" />
        </button>
        {content}
      </div>
    </div>
  ) : null;
}
