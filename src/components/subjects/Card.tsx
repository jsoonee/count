import useSubjectStore from "@/stores/subject";
import { useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";

export default function Card() {
  const navigate = useNavigate();
  const { subjects, setCurrentSubject, editSubject, removeSubject } =
    useSubjectStore();
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

  function editName(subjectId: string, subjectName: string) {
    if (
      !toEdit ||
      subjects.some(({ id, name }) => id !== subjectId && name === toEdit) ||
      toEdit === subjectName
    )
      return;
    const sub = subjects.find(({ id }) => id === subjectId);
    if (sub) {
      editSubject(subjectId, { ...sub, name: toEdit });
    }
    setEditId("");
  }

  return (
    <div>
      {subjects.map(({ id, name }) => (
        <div className="flex" key={id}>
          {id === editId ? (
            <div className="flex">
              <input type="text" value={toEdit} onChange={handleEditChange} />
              <button onClick={() => editName(id, name)}>ok</button>
            </div>
          ) : (
            <div onClick={() => handleClick(id)}>{name}</div>
          )}
          <button onClick={() => handleEditClick(id, name)}>edt</button>
          <button onClick={() => removeSubject(id)}>del</button>
        </div>
      ))}
    </div>
  );
}
