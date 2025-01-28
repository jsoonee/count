import React, { useState, useRef, useEffect } from "react";
import { useItem } from "../../../context/ItemContext";
import { TablerPlus, TablerSearch, TablerX } from "../../../lib/Icons";

export default ({ id }: { id: string | undefined }) => {
  const [value, setValue] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const { list, dispatch } = useItem();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (value.length && e.key === "Enter") {
      const curSub = list.find(({ subjectId }) => id === subjectId);
      const existItem =
        curSub && curSub.items.find(({ name }) => name === value);
      const iid = existItem && existItem.itemId;
      if (iid) {
        dispatch({
          type: "INCREMENT",
          sid: id,
          iid: iid,
        });
      } else {
        dispatch({
          type: "ADD_ITEM",
          sid: id,
          newName: value,
        });
      }
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function onClearClick() {
    setValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

  return (
    <section
      className="subject-header"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className="subject-bar">
        <div className="item-search">
          <div className="input-icon">
            <TablerSearch />
          </div>
          <input
            type="text"
            className="input input-lg item-input"
            onChange={handleInputChange}
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
        {!value ||
        !focused ||
        list
          .find(({ subjectId }) => subjectId === id)!
          .items.some(({ name }) => name === value) ? null : (
          <div className="item-autocomplete">
            <TablerPlus />
            <div className="item-new">add this new item: {value}</div>
          </div>
        )}
      </div>
    </section>
  );
};
