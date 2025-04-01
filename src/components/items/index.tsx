import useSubjectStore, { IItem } from "@/stores/subject";
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
    editItem,
    removeItem,
    countUp,
    countDown,
  } = useSubjectStore((state) => state);

  const sub = subjects.find(({ id }) => id === currentSubject);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [data, setData] = useState<IItem[]>(sub ? sub.items : []);
  const [input, setInput] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("created");
  const [asc, setAsc] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [toEdit, setToEdit] = useState<string>("");

  useEffect(() => {
    if (subjects.every(({ id }) => id !== subId)) {
      navigate({ to: "/" });
    } else {
      setCurrentSubject(subId);
    }
  }, []);

  function countChange(
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: string,
    count: number
  ) {
    const value = e.target.value;
    if (!value && !count) return;
    const num = Number(value);
    const item = sub?.items.find(({ id }) => id === itemId);
    if (item && Number.isInteger(num) && num < 10 ** 5) {
      editItem(itemId, { ...item, count: num ? +num : 0 });
    }
  }

  function minusClick(itemId: string) {
    const item = sub?.items.find(({ id }) => id === itemId);
    if (item) {
      countDown(itemId);
    }
  }

  function plusClick(itemId: string) {
    const item = sub?.items.find(({ id }) => id === itemId);
    if (item) {
      countUp(itemId);
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
    data,
    setData,
    sortBy,
    setSortBy,
    asc,
    setAsc,
    isSearch,
    setIsSearch,
    input,
    setInput,
  };

  const search = isSearch ? input : "";

  const sorted = useMemo(() => {
    if (!sub) return [];
    const items = [...sub.items];
    const sorted = search
      ? items.filter((item) =>
          item.name.trim().toLowerCase().includes(input.trim())
        )
      : items;
    console.log(sorted);
    return sorted.sort((a, b) => {
      if (sortBy === "name") {
        return asc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "count") {
        return asc
          ? a.count - b.count || a.created.localeCompare(b.created)
          : b.count - a.count || b.created.localeCompare(a.created);
      } else if (sortBy === "updated") {
        return asc
          ? a.updated.localeCompare(b.updated)
          : b.updated.localeCompare(a.updated);
      } else {
        return asc
          ? a.created.localeCompare(b.created)
          : b.created.localeCompare(a.created);
      }
    });
  }, [sub, search, sortBy, asc]);

  const inputRefs = useMemo(() => {
    const refs = {};
    sorted.forEach(({ id }) => {
      refs[id] = React.createRef();
    });
    return refs;
  }, [sorted]);

  useEffect(() => {
    if (editId && inputRefs[editId].current) {
      inputRefs[editId].current.focus();
    }
  }, [editId, inputRefs]);

  return (
    <div>
      <Header {...headerProps} />
      {sorted.length ? (
        sorted.map(({ id, name, count }) => (
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
