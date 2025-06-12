import React, { useEffect, useRef, useState } from "react";
import useModalStore from "@/stores/modal";
import useSubjectStore from "@/stores/subject";
import { TablerCircle } from "@/lib/Icons";
import EmojiPicker, { EmojiClickData, EmojiStyle, Theme } from "emoji-picker-react";
import { useNavigate } from "@tanstack/react-router";

export default function EditSubject() {
  const navigate = useNavigate();
  const [newName, setNewName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [emoji, setEmoji] = useState<EmojiClickData | null>(null);
  const { subjects, addSubject, setSorted } = useSubjectStore((state) => state);
  const { isEmojiOpen, setEmojiOpen, closeModal } = useModalStore(
    (state) => state
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        isEmojiOpen &&
        !emojiRef.current?.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setEmojiOpen(false);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newName) {
      setError("Enter a subject name.");
      return;
    }
    if (subjects.some(({ name }) => newName === name)) {
      setError("The name is already exists.");
      return;
    }
    const subjectId = addSubject({ name: newName, emoji: emoji ? emoji.emoji : "" });
    setSorted();
    navigate({to: `/sub/${subjectId}`})
    closeModal();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewName(e.target.value);
    setError("");
  }

  function handleEmojiClick(emojiData: EmojiClickData) {
    setEmoji(emojiData);
    setEmojiOpen(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-6 py-2">
        <div className="text-sm font-medium">Name</div>
        <input
          className={`w-full h-10 border-2 border-[#ddd] ${
            error
              ? "border-[red] focus:border-[red] dark:border-[red] dark:focus:border-[red]"
              : "dark:border-[#333] dark:focus:border-[#ddd]"
          } focus:border-[#333]  rounded-sm px-4 my-2`}
          value={newName}
          placeholder="Enter subject name"
          onChange={(e) => handleInputChange(e)}
          ref={inputRef}
        />
        <div className="text-[red] text-sm h-6 mb-2">{error || ""}</div>
        <div className="text-sm font-medium my-2">Icon</div>
        <div className="flex relative mb-6">
          <button
            type="button"
            className="flex items-center border border-[#bdf] dark:border-[#237] rounded-sm bg-[#def] dark:bg-[#124] hover:bg-[#bdf] dark:hover:bg-[#237] h-10 group mr-2"
            onClick={() => setEmojiOpen(!isEmojiOpen)}
            ref={buttonRef}
          >
            <div
              className="
                relative -left-[1px] aspect-square 
                flex justify-center items-center 
              bg-white dark:bg-black 
                border border-[#ddd] dark:border-[#333] rounded-l-sm 
              text-[#777] 
                h-[40px] 
              group-hover:bg-[#ddd] dark:group-hover:bg-[#333]
              "
            >
              {emoji ? (
                <div className="text-xl">{emoji.emoji}</div>
              ) : (
                <TablerCircle />
              )}
            </div>
            <div className="px-4 text-[#23a] dark:text-[#acf]">
              Select emoji
            </div>
          </button>
          {emoji && (
            <button
              type="button"
              className="h-10 border border-[#bdf] dark:border-[#23a] text-[#23a] dark:text-[#bdf] rounded-sm px-4 hover:bg-[#f3f9ff] dark:hover:bg-[#124]"
              onClick={() => setEmoji(null)}
            >
              Remove
            </button>
          )}
          {isEmojiOpen ? (
            <div className="absolute left-12 z-2 -bottom-50" ref={emojiRef}>
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                emojiStyle={EmojiStyle.NATIVE}
                theme={Theme.AUTO}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex justify-end p-6">
        <button
          type="button"
          className="h-10 mr-4 border rounded-sm px-4 text-[#222] dark:text-[#eee] border-[#eee] dark:border-[#333] hover:bg-[#f4f4f4] dark:hover:bg-[#222]"
          onClick={() => closeModal()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="h-10 rounded-sm px-4 text-white bg-[#26e] hover:bg-[#26e]/90"
        >
          Add
        </button>
      </div>
    </form>
  );
}
