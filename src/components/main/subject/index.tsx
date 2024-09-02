import React, { useEffect, useState } from "react";
import { useItem } from "../../../context/ItemContext";
import { useNavigate, useParams } from "react-router-dom";

export default () => {
  const [name, setName] = useState<string>("");
  const { id } = useParams();
  const { list, dispatch } = useItem();
  const navigate = useNavigate();
  const items = id && list.find((sub) => sub.id === +id);
  useEffect(() => {
    if (!items) navigate("/");
  });
  function onItemSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    dispatch({
      type: "ADD_ITEM",
      isCurrentSub: true,
      subjectId: +id,
      newName: name,
    });
  }

  return (
    <>
      <header className="subject-header">
        <form className="form-item-add" onSubmit={onItemSubmit}>
          <input
            type="text"
            className="input input-lg item-input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </form>
      </header>
    </>
  );
};
