import useSubjectStore from "@/stores/subject";
import { v4 } from "uuid";
import React, { useState } from "react";
import useModalStore from "@/stores/modal";
import Header from "../Header";

export default function AddSubject() {
  const [newName, setNewName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { subjects, addSubject } = useSubjectStore();
  const { closeModal } = useModalStore();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newName) {
      setError("Enter a subject name.");
      return;
    }
    if (subjects.some(({ name }) => newName === name)) {
      setError("The name is already exists.");
      return;
    }
    const now = new Date().toISOString();
    addSubject({
      id: v4(),
      name: newName,
      items: [],
      description: "",
      star: false,
      created: now,
      updated: now,
    });
    closeModal();
  }

  return (
    <>
      <Header title="Add a subject" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewName(e.target.value);
            setError("");
          }}
        />
        <footer className="flex justify-end">
          <button type="submit">Add</button>
        </footer>
      </form>
    </>
  );
}
