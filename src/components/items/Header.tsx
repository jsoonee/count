import React from "react";
import { useNavigate } from "@tanstack/react-router";

import useConfigStore from "@/stores/config";
import useSubjectStore from "@/stores/subject";
import Sort from "../../layouts/Sort";
import { TablerArrowLeft } from "@/lib/Icons";
import { buttonIconHoverColors, inputBorderColors } from "@/styles/colors";
import useMobileStore from "@/stores/mobile";

export default function Header({
  isSearch,
  setIsSearch,
  input,
  setInput,
  name,
}) {
  const color = useConfigStore((state) => state.color);
  const { subjects, currentSubject, setSorted, addItem, countUp } =
    useSubjectStore((state) => state);
  const isOpenSidebar = useMobileStore((state) => state.isOpenSidebar);
  const navigate = useNavigate();

  function handleChange(value: string) {
    setInput(value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleAddItem();
    }
  }

  function handleAddItem() {
    const items = subjects.find(({ id }) => id === currentSubject)?.items;
    const itemId = items?.find(({ name }) => name === input)?.id;
    itemId ? countUp(itemId) : addItem(input);
    setSorted();
  }

  return (
    <>
      <div className={`flex items-center ${isOpenSidebar ? "" : "pl-8"}`}>
        <button
          className={`p-1 rounded-sm ${buttonIconHoverColors[color]}`}
          onClick={() => navigate({ to: "/" })}
        >
          <TablerArrowLeft className="size-6" />
        </button>
        <div>{name}</div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <input
            className={`h-11 px-4 border-2 rounded-sm border-[#ddd] dark:border-[#333] ${inputBorderColors[color]}`}
            type="text"
            value={input}
            placeholder="Add an item/numbers or search items"
            onKeyDown={handleKeyDown}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value)
            }
          />
          <input
            type="checkbox"
            checked={isSearch}
            onChange={() => setIsSearch(!isSearch)}
          />
        </div>
        <div className="flex items-center">
          <Sort sortName="item" />
        </div>
      </div>
    </>
  );
}
