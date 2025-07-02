import React, { useEffect, useRef, useState } from "react";
import useModalStore from "@/stores/modal";
import useSubjectStore from "@/stores/subject";
import { TablerCircle } from "@/lib/Icons";
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";
import { useNavigate } from "@tanstack/react-router";
import useConfigStore from "@/stores/config";
import {
  buttonOutlineColors,
  buttonSolidColors,
  buttonSurfaceColors,
  buttonSurfaceTextColors,
  inputBorderColors,
} from "@/styles/colors";

export default function EditSubject({ subjectEditId }: { subjectEditId?: string }) {
  const { subjects, addSubject, editSubject, setSorted } = useSubjectStore(
    (state) => state
  );
  const currentSub = subjects.find((sub) => sub.id === subjectEditId) || null;
  const [newName, setNewName] = useState<string>(currentSub?.name || "");
  const [error, setError] = useState<string>("");
  const [emoji, setEmoji] = useState<string>(currentSub?.emoji || "");
  const { isEmojiOpen, setEmojiOpen, closeModal, setSubmitted } = useModalStore(
    (state) => state
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  const color = useConfigStore((state) => state.color);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {}, []);

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
    if (subjectEditId && currentSub) {
      if (
        subjects.some(
          ({ id, name }) => newName === name && subjectEditId !== id
        )
      ) {
        setError("The name is already exists.");
        return;
      }
      editSubject(subjectEditId, {
        ...currentSub,
        name: newName,
        emoji: emoji,
      });
    } else {
      if (subjects.some(({ name }) => newName === name)) {
        setError("The name is already exists.");
        return;
      }
      const subjectId = addSubject({
        name: newName,
        emoji: emoji,
      });
      navigate({ to: `/sub/${subjectId}` });
      setSubmitted(true);
    }
    setSorted();
    closeModal();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewName(e.target.value);
    setError("");
  }

  function handleEmojiClick(emojiData: EmojiClickData) {
    setEmoji(emojiData.emoji);
    setEmojiOpen(false);
  }

  console.log(emoji);

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-6 py-2">
        <div className="text-sm font-medium">Name</div>
        <input
          className={`w-full h-10 border-2 ${
            error
              ? "border-[red] focus:border-[red] dark:border-[red] dark:focus:border-[red]"
              : `border-[#ddd] dark:border-[#333] ${inputBorderColors[color]}`
          } rounded-sm px-4 my-2`}
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
            className={`flex items-center border h-10 rounded-sm group mr-2 ${buttonSurfaceColors[color]}`}
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
              group-hover:bg-[#eee] group-active:bg-[#eee] dark:group-hover:bg-[#333]
              "
            >
              {emoji ? (
                <div className="text-xl">{emoji}</div>
              ) : (
                <TablerCircle />
              )}
            </div>
            <div className={`px-4 ${buttonSurfaceTextColors[color]}`}>
              Select emoji
            </div>
          </button>
          <button
            type="button"
            className={`h-10 border rounded-sm px-4 ${
              emoji ? "visible" : "invisible"
            } ${buttonOutlineColors[color]}`}
            onClick={() => setEmoji("")}
          >
            Remove
          </button>
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
          className={`h-10 rounded-sm px-4 ${buttonSolidColors[color]}`}
        >
          {subjectEditId ? "Edit" : "Add"}
        </button>
      </div>
    </form>
  );
}
