import { TablerCircle, TablerDotsVertical } from "@/lib/Icons";
import useConfigStore from "@/stores/config";
import useSubjectStore from "@/stores/subject";
import { cardHoverColors } from "@/styles/colors";
import { useNavigate } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import CardMenu from "./Menu";

export default function Card() {
  const navigate = useNavigate();
  const {
    subjects,
    sorted,
    setCurrentSubject,
    setSorted,
    editSubject,
    removeSubject,
  } = useSubjectStore((state) => state);
  const [editId, setEditId] = useState<string>("");
  const [toEdit, setToEdit] = useState<string>("");
  const color = useConfigStore((state) => state.color);
  const menuRef = useRef<HTMLDivElement>(null);

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  function handleClick(id: string) {
    setCurrentSubject(id);
    navigate({ to: "/sub/$subId", params: { subId: id } });
  }

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
    setToEdit(e.target.value);
  }

  function handleEditClick(subjectId: string, subjectName: string) {
    if (!editId) {
      setToEdit(subjectName);
      setEditId(subjectId);
    }
  }

  function handleDeleteClick(subjectId: string) {
    removeSubject(subjectId);
    setSorted();
  }

  function handleNameSubmit(
    e: React.FormEvent,
    subjectId: string,
    subjectName: string
  ) {
    e.preventDefault();
    if (
      toEdit &&
      subjects.every(({ id, name }) => id === subjectId || name !== toEdit) &&
      toEdit !== subjectName
    ) {
      const sub = subjects.find(({ id }) => id === subjectId);
      if (sub) {
        editSubject(subjectId, { ...sub, name: toEdit });
        setSorted();
      }
    }
    setEditId("");
  }

  function handleOpenMenu(e: React.MouseEvent, subjectId: string) {
    e.stopPropagation();
    setOpenMenu(openMenu === subjectId ? null : subjectId);
  }

  return (
    <div className="p-4 grid grid-cols-3 gap-4">
      {sorted.map(({ id, name, emoji }) => (
        <div
          className={`relative flex items-center px-2 py-6 cursor-pointer rounded-md border bg-gray-50 dark:bg-gray-950 border-gray-100 dark:border-gray-800/50 ${cardHoverColors[color]}`}
          key={id}
          onClick={() => handleClick(id)}
        >
          <button
            className="absolute top-1 right-1 p-0.5 rounded-sm hover:bg-black/10 active:bg-black/10 dark:hover:bg-white/15 dark:active:bg-white/15"
            onClick={(e) => handleOpenMenu(e, id)}
          >
            <TablerDotsVertical className="size-3.5" />
          </button>
          {openMenu === id ? <CardMenu subjectId={id} setOpenMenu={setOpenMenu} menuRef={menuRef} /> : null}
          {emoji ? (
            <div className="text-xl aspect-square">{emoji}</div>
          ) : (
            <div className="flex items-center justify-center w-7 text-[#777]">
              <TablerCircle />
            </div>
          )}
          <div className="ml-2">{name}</div>
        </div>
        // <div className="flex" key={id}>
        //   {id === editId ? (
        //     <form
        //       className="flex"
        //       onSubmit={(e) => handleNameSubmit(e, id, name)}
        //     >
        //       <input type="text" value={toEdit} onChange={handleEditChange} />
        //       <button type="submit">ok</button>
        //     </form>
        //   ) : (
        //     <div onClick={() => handleClick(id)}>{name}</div>
        //   )}
        //   <button onClick={() => handleEditClick(id, name)}>edt</button>
        //   <button onClick={() => handleDeleteClick(id)}>del</button>
        // </div>
      ))}
    </div>
  );
}
