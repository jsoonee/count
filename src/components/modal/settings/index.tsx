import { TablerCheck, TablerMoon, TablerSunHigh, TablerSunMoon } from "@/lib/Icons";
import useConfigStore from "@/stores/config";
import { buttonSidebarMenuHoverColors } from "@/styles/colors";
import React, { useState } from "react";

export default function Settings() {
  const { username, setUsername, theme, setTheme, color, setColor } = useConfigStore((state) => state);
  const [isNameEdit, setIsNameEdit] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(username || "");
  function applyName() {
    setUsername(newName);
    setIsNameEdit(false);
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <h2>Profile</h2>
        {isNameEdit ? (
          <button onClick={() => applyName()}>Apply</button>
        ) : (
          <button onClick={() => setIsNameEdit(true)}>Edit</button>
        )}
      </div>
      {isNameEdit ? (
        <input type="text" name="username" placeholder="Count" value={newName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)} />
      ) : (
        <div>{username || "Count"}</div>
      )}
      <h2>Theme</h2>
      <div className="flex items-center">
        <button className={`p-1 border-3 rounded-sm ${theme === "light" ? "border-blue-400" : "border-transparent"} ${buttonSidebarMenuHoverColors[color]}`} onClick={() => setTheme("light")}><TablerSunHigh /></button>
        <button className={`p-1 border-3 rounded-sm ${theme === "dark" ? "border-blue-400" : "border-transparent"} ${buttonSidebarMenuHoverColors[color]}`} onClick={() => setTheme("dark")}><TablerMoon /></button>
        <button className={`p-1 border-3 rounded-sm ${theme === "os" ? "border-blue-400" : "border-transparent"} ${buttonSidebarMenuHoverColors[color]}`} onClick={() => setTheme("os")}><TablerSunMoon /></button>
      </div>
      <h2>Color</h2>
      <div className="flex">
        <button className="flex size-8 rounded-[50%] border-1 border-gray-200 p-1 bg-gray-400" onClick={() => setColor("gray")}>{color === "gray" ? <TablerCheck /> : null}</button>
        <button className="flex size-8 rounded-[50%] border-1 border-gray-200 p-1 bg-pink-400" onClick={() => setColor("pink")}>{color === "pink" ? <TablerCheck /> : null}</button>
        <button className="flex size-8 rounded-[50%] border-1 border-gray-200 p-1 bg-yellow-400" onClick={() => setColor("yellow")}>{color === "yellow" ? <TablerCheck /> : null}</button>
        <button className="flex size-8 rounded-[50%] border-1 border-gray-200 p-1 bg-green-400" onClick={() => setColor("green")}>{color === "green" ? <TablerCheck /> : null}</button>
        <button className="flex size-8 rounded-[50%] border-1 border-gray-200 p-1 bg-orange-400" onClick={() => setColor("orange")}>{color === "orange" ? <TablerCheck /> : null}</button>
        <button className="flex size-8 rounded-[50%] border-1 border-gray-200 p-1 bg-rose-400" onClick={() => setColor("rose")}>{color === "rose" ? <TablerCheck /> : null}</button>
        <button className="flex size-8 rounded-[50%] border-1 border-gray-200 p-1 bg-crimson-400" onClick={() => setColor("crimson")}>{color === "crimson" ? <TablerCheck /> : null}</button>
        <button className="flex size-8 rounded-[50%] border-1 border-gray-200 p-1 bg-blue-400" onClick={() => setColor("blue")}>{color === "blue" ? <TablerCheck /> : null}</button>
        <button className="flex size-8 rounded-[50%] border-1 border-gray-200 p-1 bg-purple-400" onClick={() => setColor("purple")}>{color === "purple" ? <TablerCheck /> : null}</button>
        <button className="flex size-8 rounded-[50%] border-1 border-gray-200 p-1 bg-burgundy-400" onClick={() => setColor("burgundy")}>{color === "burgundy" ? <TablerCheck /> : null}</button>
        <button className="flex size-8 rounded-[50%] border-1 border-gray-200 p-1 bg-coral-400" onClick={() => setColor("coral")}>{color === "coral" ? <TablerCheck /> : null}</button>
        <button className="flex size-8 rounded-[50%] border-1 border-gray-200 p-1 bg-teal-400" onClick={() => setColor("teal")}>{color === "teal" ? <TablerCheck /> : null}</button>
      </div>
    </>
  );
}
 