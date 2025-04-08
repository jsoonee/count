import useSubjectStore from "@/stores/subject";
import { useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";

export default function Card() {
  const navigate = useNavigate();
  const { subjects, sorted, setCurrentSubject, setSorted, editSubject, removeSubject } =
    useSubjectStore((state) => state);
  const [editId, setEditId] = useState<string>("");
  const [toEdit, setToEdit] = useState<string>("");

  function handleClick(id: string) {
    setCurrentSubject(id);
    navigate({ to: "/sub/$subId", params: { subId: id } });
  }

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

  return (
    <div>
      {sorted.map(({ id, name }) => (
        <div className="flex" key={id}>
          {id === editId ? (
            <form
              className="flex"
              onSubmit={(e) => handleNameSubmit(e, id, name)}
            >
              <input type="text" value={toEdit} onChange={handleEditChange} />
              <button type="submit">ok</button>
            </form>
          ) : (
            <div onClick={() => handleClick(id)}>{name}</div>
          )}
          <button onClick={() => handleEditClick(id, name)}>edt</button>
          <button onClick={() => handleDeleteClick(id)}>del</button>
        </div>
      ))}
    </div>
  );
}
