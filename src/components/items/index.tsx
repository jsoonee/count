import useSubjectStore, { IItem, ISubject } from "@/stores/subject";
import { useNavigate } from "@tanstack/react-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Empty from "./Empty";
import Header from "./Header";
import { Route } from "@/routes/sub.$subId";

export default function Items() {
  const navigate = useNavigate();
  const { subId } = Route.useParams();
  const {
    subjects,
    currentSubject,
    setCurrentSubject,
    setSorted,
    editItem,
    removeItem,
    countUp,
    countDown,
  } = useSubjectStore((state) => state);

  const sub = subjects.find(({ id }) => id === currentSubject);
  const [sortedItems, setSortedItems] = useState<IItem[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [editId, setEditId] = useState<string>("");
  const [toEdit, setToEdit] = useState<string>("");

  useEffect(() => {
    if (subjects.every(({ id }) => id !== subId)) {
      setCurrentSubject("");
      navigate({ to: "/" });
    } else {
      setCurrentSubject(subId);
      setInput("");
      setEditId("");
      setToEdit("");
    }
  }, [subId]);

  useEffect(() => {
    const items = sub?.items || [];
    const { by, asc } = sub?.sort || { by: "created", asc: false };
    const toSort = [...items];
    if (by === "name") {
      toSort.sort((a, b) =>
        asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
    } else if (by === "count") {
      toSort.sort((a, b) =>
        asc
          ? a.count - b.count || a.created.localeCompare(b.created)
          : b.count - a.count || b.created.localeCompare(a.created)
      );
    } else if (by === "updated") {
      toSort.sort((a, b) =>
        asc
          ? a.updated.localeCompare(b.updated)
          : b.updated.localeCompare(a.updated)
      );
    } else {
      if (asc) toSort.reverse();
    }
    setSortedItems(toSort);
  }, [sub]);

  function countChange(
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: string,
    count: number
  ) {
    const value = e.target.value;
    if (!value && !count) return;
    const num = Number(value);
    const item = sub?.items.find(({ id }) => id === itemId);
    const now = new Date().toISOString();
    if (item && Number.isInteger(num) && num < 10 ** 5) {
      editItem(itemId, { ...item, count: num ? +num : 0, updated: now });
      setSorted();
    }
  }

  function minusClick(itemId: string) {
    const item = sub?.items.find(({ id }) => id === itemId);
    if (item) {
      countDown(itemId);
      setSorted();
    }
  }

  function plusClick(itemId: string) {
    const item = sub?.items.find(({ id }) => id === itemId);
    if (item) {
      countUp(itemId);
      setSorted();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === "Escape") {
      (e.target as HTMLInputElement).blur();
    }
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setToEdit(e.target.value);
  }

  function handleNameSubmit(
    e: React.FormEvent,
    itemId: string,
    itemName: string
  ) {
    e.preventDefault();
    if (
      toEdit &&
      sub?.items.every(({ id, name }) => id === itemId || name !== toEdit) &&
      toEdit !== itemName
    ) {
      const item = sub?.items.find(({ id }) => id === itemId);
      if (item) {
        editItem(itemId, { ...item, name: toEdit });
        setSorted();
      }
    }
    setEditId("");
  }

  function handleNameClick(itemId: string, itemName: string) {
    if (!editId) {
      setToEdit(itemName);
      setEditId(itemId);
    }
  }

  const headerProps = {
    isSearch,
    setIsSearch,
    input,
    setInput,
  };

  const inputRefs = useMemo(() => {
    const refs = {};
    sortedItems.forEach(({ id }) => {
      refs[id] = React.createRef();
    });
    return refs;
  }, [sortedItems]);

  useEffect(() => {
    if (editId && inputRefs[editId].current) {
      inputRefs[editId].current.focus();
    }
  }, [editId]);

  return (
    <div>
      <Header {...headerProps} />
      {sortedItems.length ? (
        sortedItems.map(({ id, name, count }) => (
          <div className="flex" key={id}>
            {id === editId ? (
              <form
                className="flex"
                onSubmit={(e) => handleNameSubmit(e, id, name)}
              >
                <input
                  type="text"
                  value={toEdit}
                  onChange={handleNameChange}
                  ref={inputRefs[id]}
                />
                <button type="submit">ok</button>
              </form>
            ) : (
              <div onClick={() => handleNameClick(id, name)}>{name}</div>
            )}
            <button onClick={() => minusClick(id)}>-</button>
            <input
              type="text"
              value={count}
              inputMode="numeric"
              onKeyDown={handleKeyDown}
              onChange={(e) => countChange(e, id, count)}
            />
            <button onClick={() => plusClick(id)}>+</button>
            <button onClick={() => removeItem(id)}>del</button>
          </div>
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
}
