import React, { useEffect, useRef, useState } from "react";

const sorts = ["name", "count", "created", "updated"];

interface ISort {
  subjectId?: string;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  asc: boolean;
  setAsc: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sort({subjectId, sortBy, setSortBy, asc, setAsc}: ISort) {
  const [openSort, setOpenSort] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleSortClick(s: string) {
    s === sortBy ? setAsc(!asc) : setSortBy(s);
    setOpenSort(false);
  }

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        openSort &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpenSort(false);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  return (
    <>
      <button onClick={() => setOpenSort(!openSort)} ref={buttonRef}>
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
      ) : null}
    </>
  );
}
