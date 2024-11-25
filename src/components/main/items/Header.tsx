import React, { useState, useRef } from "react";
import { useItem } from "../../../context/ItemContext";
import { TablerSearch, TablerX } from "../../../lib/Icons";

export default ({ id }: { id: string | undefined }) => {
  const [value, setValue] = useState<string>("");
  const { list, dispatch } = useItem();
  const inputRef = useRef<HTMLInputElement>(null);
  // const navigate = useNavigate();
  // const items = id && list.find((sub) => sub.id === id);
  // useEffect(() => {
  //   if (!items) navigate("/");
  // });
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

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const curSub = list.find(({subjectId}) => id === subjectId);
      const existItem = curSub && curSub.items.find(({name}) => name === value)
      const iid = existItem && existItem.itemId;
      if (iid) {
        dispatch({
          type: "INCREMENT",
          isCurrentSub: true,
          sid: id,
          iid: iid,
        })
      } else {
        dispatch({
          type: "ADD_ITEM",
          isCurrentSub: true,
          sid: id,
          newName: value,
        });
      }
      console.log(list);
    }
  }

  function onClearClick() {
    setValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

  return (
    <section className="subject-header">
      <div className="item-search">
        <div className="input-icon">
          <TablerSearch />
        </div>
        <input
          type="text"
          className="input input-lg item-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        {value ? (
          <button
            className="icon-button icon-button-square button-alt button-clear"
            onClick={onClearClick}
          >
            <TablerX />
          </button>
        ) : null}
      </div>
    </section>
  );
};
