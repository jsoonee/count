import { TablerMoon, TablerSunHigh, TablerSunMoon } from "@/lib/Icons";
import useConfigStore from "@/stores/config";
import React, { useState } from "react";

export default function Settings() {
  const { username, setUsername, setTheme } = useConfigStore((state) => state);
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
        <button onClick={() => setTheme("light")}><TablerSunHigh /></button>
        <button onClick={() => setTheme("dark")}><TablerMoon /></button>
        <button onClick={() => setTheme("os")}><TablerSunMoon /></button>
      </div>
    </>
  );
}
 