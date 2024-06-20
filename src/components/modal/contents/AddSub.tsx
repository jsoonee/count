import React, { useState } from "react";
import { useItem } from "../../../context/ItemContext";

export default ({ closeModal }: { closeModal: () => void }) => {
  const { state, dispatch } = useItem();
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

  function onAddClick(e: React.FormEvent) {
    e.preventDefault()
    if (!name) {
      console.log("noname");
      setError("Enter a subject name.");
      return;
    }
    if (state.some((sub) => sub.name === name)) {
      console.log("already existed");
      setError("This subject name is already exists.");
      return;
    }
    dispatch({ type: "ADD_SUB", newName: name });
    closeModal();
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
              className="modal-button modal-button-pri"
            >
              Add
            </button>
            <button
              type="button"
              className="modal-button modal-button-alt"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
