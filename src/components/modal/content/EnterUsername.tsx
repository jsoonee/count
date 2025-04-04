import React, { useEffect, useRef, useState } from "react";
import Header from "../Header";
import useConfigStore from "@/stores/config";
import useModalStore from "@/stores/modal";

export default function EnterUsername() {
  const [newName, setNewName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { setUsername } = useConfigStore();
  const { closeModal } = useModalStore();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newName) {
      setError("Username cannot be empty.");
      return;
    }
    setUsername(newName);
    closeModal();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length <= 20) {
      setNewName(e.target.value);
      setError("");
    }
  }

  return (
    <>
      <Header title="Enter your username" />
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={newName}
          onChange={handleInputChange}
        />
        <div className="flex justify-end">
          <button type="submit">Confirm</button>
        </div>
      </form>
    </>
  );
}
