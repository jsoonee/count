import React, { useState } from "react";
import { useItem } from "../../../context/ItemContext";

export default ({ closeModal }: { closeModal: (isAdded: boolean) => void }) => {
  const { state, dispatch } = useItem();
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

  function onAddClick(e: React.FormEvent) {
    e.preventDefault()
    if (!name) {
      setError("Enter a subject name.");
      return;
    }
    if (state.some((sub) => sub.name === name)) {
      setError("This subject name is already exists.");
      return;
    }
    closeModal(true);
    dispatch({ type: "ADD_SUB", newName: name });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    setName(e.target.value);
  }

  return (
    <>
      <div className="modal-body">
        <form onSubmit={onAddClick}>
          <input
            className={`input input-lg add-sub-input${
              error ? " input-error" : ""
            }`}
            placeholder="Subject"
            autoFocus
            onChange={handleInputChange}
          />
          <div className="modal-error-message">{error}</div>
          <div className="modal-footer">
            <button
              type="submit"
              className="button-rec button-pri"
            >
              Add
            </button>
            <button
              type="button"
              className="button-rec button-alt"
              onClick={() => closeModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
