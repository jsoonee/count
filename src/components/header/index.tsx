import useSubjectStore from "@/stores/subject";
import { exportData, importData } from "@/utils/manageData";
import { useNavigate } from "@tanstack/react-router";
import React from "react";

export default function Header() {
  const subjects = useSubjectStore((state) => state.subjects);

  const navigate = useNavigate();

  function handleExportClick() {
    if (!subjects.length) {
      return;
    }
    exportData();
  }

  function handleImportChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      importData(files[0]);
      navigate({ to: "/" });
    }
  }

  return (
    <header className="flex">
      <button onClick={handleExportClick}>Export</button>
      <label>
        <input
          className="hidden"
          type="file"
          accept=".json"
          onChange={handleImportChange}
        />
        <div>Upload</div>
      </label>
    </header>
  );
}
