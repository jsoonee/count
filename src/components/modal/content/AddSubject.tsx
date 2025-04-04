import useSubjectStore from "@/stores/subject";
import { v4 } from "uuid";
import React, { useEffect, useRef, useState } from "react";
import useModalStore from "@/stores/modal";
import Header from "../Header";

export default function AddSubject() {
  const [newName, setNewName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { subjects, addSubject } = useSubjectStore(state => state);
  const closeModal = useModalStore(state => state.closeModal);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
    addSubject(newName);
    closeModal();
  }

  return (
    <>
      <Header title="Add a subject" />
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewName(e.target.value);
            setError("");
          }}
        />
        <div className="flex justify-end">
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
}
