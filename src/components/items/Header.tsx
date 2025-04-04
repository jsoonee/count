import useSubjectStore from "@/stores/subject";
import { useNavigate } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import Sort from "../Sort";

export default function Header({
  sortBy,
  setSortBy,
  asc,
  setAsc,
  isSearch,
  setIsSearch,
  input,
  setInput,
}) {
  const [error, setError] = useState<string>("");
  // const [openSort, setOpenSort] = useState<boolean>(false);
  const { subjects, currentSubject, addItem, countUp } = useSubjectStore(
    (state) => state
  );
  const navigate = useNavigate();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // const sorts = ["name", "count", "created", "updated"];

  // function handleOutsideClick(e: MouseEvent) {
  //   if (
  //     openSort &&
  //     dropdownRef.current &&
  //     !dropdownRef.current.contains(e.target as Node) &&
  //     !buttonRef.current?.contains(e.target as Node)
  //   ) {
  //     setOpenSort(false);
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener("click", handleOutsideClick);
  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // });

  // function handleSortClick(s: string) {
  //   s === sortBy ? setAsc(!asc) : setSortBy(s);
  //   setOpenSort(false);
  // }

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
    const now = new Date().toISOString();
    itemId
      ? countUp(itemId)
      : addItem({
          id: v4(),
          name: input,
          count: 1,
          description: "",
          star: false,
          created: now,
          updated: now,
        });
  }

  const sortProps = { sortBy, setSortBy, asc, setAsc }

  return (
    <div className="flex">
      <button onClick={() => navigate({ to: "/" })}>Back</button>
      <input
        type="text"
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
      <Sort {...sortProps}/>
      {/* <button onClick={() => setOpenSort(!openSort)} ref={buttonRef}>
        <span>{sortBy}</span>
      </button>
      {openSort ? (
        <div ref={dropdownRef}>
          <ul className="absolute">
            {sorts.map((s, i) => (
              <li key={i} onClick={() => handleSortClick(s)}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      ) : null} */}
      <input type="checkbox" checked={asc} onChange={() => setAsc(!asc)} />
    </div>
  );
}
