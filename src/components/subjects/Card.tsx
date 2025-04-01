import useSubjectStore from "@/stores/subject";
import { useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";

export default function Card() {
  const navigate = useNavigate();
  const { subjects, setCurrentSubject, editSubject, removeSubject } =
    useSubjectStore();
  const [editId, setEditId] = useState<string>("");
  const [toEdit, setToEdit] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [asc, setAsc] = useState<boolean>(false);
  const [openSort, setOpenSort] = useState<boolean>(false);

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

  function editName(subjectId: string, subjectName: string) {}

  // function sortSubjects() {
  //   const sorted = [...subjects];
  //   sorted.sort((a,b) => {
  //     if (sortBy === "name") {
  //       return asc
  //       ? a.name.localeCompare(b.name)
  //       : b.name.localeCompare(a.name);
  //     } else if (sortBy === "count") {
  //       const sumA = a.items.reduce((acc,cur) => acc+cur.count,0);
  //       const sumB = b.items.reduce((acc,cur) => acc+cur.count,0);
  //       return asc ? sumA - sumB : sumB - sumA;
  //     } else if (sortBy === "updated") {
  //       return asc
  //         ? a.updated.localeCompare(b.updated)
  //         : b.updated.localeCompare(a.updated);
  //     } else {
  //       return asc
  //         ? a.created.localeCompare(b.created)
  //         : b.created.localeCompare(a.created);
  //     }
  //   });
  //   return sorted;
  // }

  const sorted = [...subjects].sort((a, b) => {
    if (sortBy === "name") {
      return asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortBy === "count") {
      const sumA = a.items.reduce((acc, cur) => acc + cur.count, 0);
      const sumB = b.items.reduce((acc, cur) => acc + cur.count, 0);
      return asc ? sumA - sumB : sumB - sumA;
    } else if (sortBy === "updated") {
      return asc
        ? a.updated.localeCompare(b.updated)
        : b.updated.localeCompare(a.updated);
    } else {
      return asc
        ? a.created.localeCompare(b.created)
        : b.created.localeCompare(a.created);
    }
  });

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
          <button onClick={() => removeSubject(id)}>del</button>
        </div>
      ))}
    </div>
  );
}
