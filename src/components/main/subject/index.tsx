import React, { useEffect, useState } from "react";
import { useItem } from "../../../context/ItemContext";
import { useNavigate, useParams } from "react-router-dom";
import { TablerSearch, TablerX } from "../../../lib/Icons";

export default () => {
  const [name, setName] = useState<string>("");
  const { id } = useParams();
  const { list, dispatch } = useItem();
  const navigate = useNavigate();
  const items = id && list.find((sub) => sub.id === +id);
  useEffect(() => {
    if (!items) navigate("/");
  });
  // function onItemSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   if (!id) return;
  //   dispatch({
  //     type: "ADD_ITEM",
  //     isCurrentSub: true,
  //     subjectId: +id,
  //     newName: name,
  //   });
  //   console.log(list);
  // }

  return (
    <header className="subject-header">
      <div className="item-search">
        <div className="input-icon">
          <TablerSearch />
        </div>
        <input
          type="text"
          className="input input-lg item-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <div className="input-icon button-clear">
          <TablerX />
        </div>
      </div>
    </header>
  );
};
