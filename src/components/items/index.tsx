import useSubjectStore, { IItem } from "@/stores/subject";
import { useNavigate } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import Empty from "./Empty";
import Header from "./Header";

export default function Items() {
  const navigate = useNavigate();
  const { subjects, currentSubject, editItem, removeItem, countUp, countDown } =
    useSubjectStore();

  const sub = subjects.find(({ id }) => id === currentSubject);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [data, setData] = useState<IItem[]>(sub ? sub.items : []);
  const [input, setInput] = useState<string>("");
  const [sort, setSort] = useState<string>("created");
  const [asc, setAsc] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [toEdit, setToEdit] = useState<string>("");

  useEffect(() => {
    if (!sub) navigate({ to: "/" });
  }, []);

  function countChange(e: React.ChangeEvent<HTMLInputElement>, itemId: string) {
    const newNum = Number(e.target.value.replace(/[^\d]/g, ""));
    if (newNum >= 10 ** 5) {
      return;
    }
    const item = sub?.items.find(({ id }) => id === itemId);
    if (item) {
      editItem(itemId, { ...item, count: newNum });
    }
  }

  function minusClick(itemId: string) {
    const item = sub?.items.find(({ id }) => id === itemId);
    const now = new Date().toISOString();
    if (item) {
      editItem(itemId, {
        ...item,
        count: item.count ? item.count - 1 : 0,
        updated: now,
      });
    }
  }

  function plusClick(itemId: string) {
    const item = sub?.items.find(({ id }) => id === itemId);
    const now = new Date().toISOString();
    if (item && item.count + 1 < 10 ** 5) {
      editItem(itemId, {
        ...item,
        count: item.count + 1,
        updated: now,
      });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === "Escape") {
      (e.target as HTMLInputElement).blur();
    }
  }

  function sortData(search: string) {
    if (!sub) return [];
    let sorted = [...sub.items];
    if (search && isSearch) {
      sorted = sorted.filter(({ name }) => name.toLowerCase().includes(search));
    }
    sorted.sort((a, b) => {
      if (sort === "name") {
        return asc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sort === "count") {
        return asc
          ? a.count - b.count || a.created.localeCompare(b.created)
          : b.count - a.count || b.created.localeCompare(a.created);
      } else if (sort === "updated") {
        return asc
          ? a.updated.localeCompare(b.updated)
          : b.updated.localeCompare(a.updated);
      } else {
        return asc
          ? a.created.localeCompare(b.created)
          : b.created.localeCompare(a.created);
      }
    });
    return sorted;
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setToEdit(e.target.value);
  }

  function handleNameClick(itemId: string, itemName: string) {
    if (!editId) {
      setToEdit(itemName);
      setEditId(itemId);
    }
  }

  function editName(itemId: string) {
    if (
      !toEdit ||
      sub?.items.some(({ id, name }) => id !== itemId && name === toEdit)
    )
      return;
    const item = sub?.items.find(({ id }) => id === itemId);
    if (item) {
      editItem(itemId, { ...item, name: toEdit });
    }
    setEditId("");
  }

  const headerProps = {
    data,
    setData,
    sort,
    setSort,
    asc,
    setAsc,
    isSearch,
    setIsSearch,
    sortData,
    input,
    setInput,
  };

  const sorted = sortData(input);

  return (
    <div>
      <Header {...headerProps} />
      {sorted.length ? (
        sorted.map((item) => (
          <div className="flex" key={item.id}>
            {item.id === editId ? (
              <div className="flex">
                <input type="text" value={toEdit} onChange={handleNameChange} />
                <button onClick={() => editName(item.id)}>ok</button>
              </div>
            ) : (
              <div onClick={() => handleNameClick(item.id, item.name)}>
                {item.name}
              </div>
            )}
            <button onClick={() => minusClick(item.id)}>-</button>
            <input
              type="text"
              value={item.count}
              inputMode="numeric"
              onKeyDown={handleKeyDown}
              onChange={(e) => countChange(e, item.id)}
            />
            <button onClick={() => plusClick(item.id)}>+</button>
            <button onClick={() => removeItem(item.id)}>del</button>
          </div>
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
}
