import useSubjectStore from "@/stores/subject";
import { useNavigate } from "@tanstack/react-router";
import React, { useRef, useState } from "react";
import Sort from "../../layouts/Sort";

export default function Header({ isSearch, setIsSearch, input, setInput }) {
  const [error, setError] = useState<string>("");
  const { subjects, currentSubject, setSorted, addItem, countUp } =
    useSubjectStore((state) => state);
  const navigate = useNavigate();

  function handleChange(value: string) {
    setInput(value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleAddItem();
    }
  }

  function handleAddItem() {
    const items = subjects.find(({ id }) => id === currentSubject)?.items;
    const itemId = items?.find(({ name }) => name === input)?.id;
    itemId ? countUp(itemId) : addItem(input);
    setSorted();
  }

  return (
    <div className="flex">
      <button onClick={() => navigate({ to: "/" })}>Back</button>
      <input
        type="text"
        value={input}
        onKeyDown={handleKeyDown}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value)
        }
      />
      <input
        type="checkbox"
        checked={isSearch}
        onChange={() => setIsSearch(!isSearch)}
      />
      <Sort sortName="item" />
    </div>
  );
}
