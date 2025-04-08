import useSubjectStore from "@/stores/subject";
import { useEffect, useRef, useState } from "react";

export default function Sort({ isSubject }: { isSubject: boolean }) {
  const sorts = isSubject
    ? ["name", "number", "count", "created", "updated"]
    : ["name", "count", "created", "updated"];
  const { subjects, sortBy, currentSubject, setSubjectSort, setItemSort } =
    useSubjectStore((state) => state);
  const itemSort = subjects.find(({ id }) => id === currentSubject)?.sort || {
    by: "created",
    asc: false,
  };

  const sortInfo = isSubject ? sortBy : itemSort;
  const [isAsc, setIsAsc] = useState<boolean>(sortInfo.asc);
  const [openSort, setOpenSort] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleSortClick(s: string) {
    if (isSubject) {
      const { by, asc } = sortBy;
      setSubjectSort({ by: s, asc: s === by ? !asc : asc });
    } else {
      const { by, asc } = subjects.find(({ id }) => id === currentSubject)
        ?.sort || {
        by: "created",
        asc: false,
      };
      setItemSort({ by: s, asc: s === by ? !asc : asc });
    }
    setOpenSort(false);
  }

  function handleAscClick() {
    if (isSubject) {
      setSubjectSort({ ...sortBy, asc: !isAsc });
    } else {
      setItemSort({ ...itemSort, asc: !isAsc });
    }
    setIsAsc(!isAsc);
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
        <span>{sortInfo.by}</span>
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
      <button onClick={handleAscClick}>{sortInfo.asc ? "asc" : "desc"}</button>
    </>
  );
}
