import {
  TablerArrowsSort,
  TablerCheck,
  TablerSortAscending,
  TablerSortAscendingLetters,
  TablerSortAscendingNumbers,
  TablerSortDescending,
  TablerSortDescendingLetters,
  TablerSortDescendingNumbers,
} from "@/lib/Icons";
import useConfigStore from "@/stores/config";
import useSubjectStore from "@/stores/subject";
import { buttonSidebarMenuHoverColors, menuHoverColors } from "@/styles/colors";
import { useEffect, useRef, useState } from "react";

const sorts = {
  subject: ["name", "number", "count", "created", "updated"],
  item: ["name", "count", "created", "updated"],
};

export default function Sort({ sortName }: { sortName: string }) {
  const { subjects, sortBy, currentSubject, setSubjectSort, setItemSort } =
    useSubjectStore((state) => state);
  const itemSort = subjects.find(({ id }) => id === currentSubject)?.sort || {
    by: "created",
    asc: false,
  };
  const color = useConfigStore((state) => state.color);

  const isSubject = sortName === "subject";
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

  console.log(sortName);

  return (
    <div className="relative">
      <div className="flex items-center">
        <button
          className={`p-1 flex justify-center gap-1.5 items-center border-1 w-28 h-9 rounded-l-sm border-gray-50 dark:border-gray-800 ${menuHoverColors[color]}`}
          onClick={() => setOpenSort(!openSort)}
          ref={buttonRef}
        >
          <TablerArrowsSort className="size-5" />
          <span>{sortInfo.by}</span>
        </button>
        <button
          className={`flex justify-center items-center p-1 w-9 h-9 border-t border-r border-b rounded-r-sm border-gray-50 dark:border-gray-800 ${menuHoverColors[color]}`}
          onClick={handleAscClick}
        >
          {sortInfo.by === "name" ? (
            sortInfo.asc ? (
              <TablerSortAscendingLetters />
            ) : (
              <TablerSortDescendingLetters />
            )
          ) : sortInfo.by === "count" ? (
            sortInfo.asc ? (
              <TablerSortAscendingNumbers />
            ) : (
              <TablerSortDescendingNumbers />
            )
          ) : sortInfo.asc ? (
            <TablerSortAscending />
          ) : (
            <TablerSortDescending />
          )}
        </button>
      </div>
      {openSort ? (
        <div ref={dropdownRef}>
          <ul className="absolute p-1 w-28 top-0 left-0 z-1 border-1 rounded-l-sm rounded-br-sm bg-white dark:bg-[#111] border-gray-50 dark:border-gray-800">
            {sorts[sortName].map((by: string, i: number) => (
              <li
                className={`p-1 flex items-center rounded-sm ${buttonSidebarMenuHoverColors[color]}`}
                key={i}
                onClick={() => handleSortClick(by)}
              >
                {sortInfo.by === by ? <div className="w-5"><TablerCheck className="size-5"/></div> : <div className="pl-5"></div>}
                <div className="pl-1 text-sm">{by}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
