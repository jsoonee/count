import useSubjectStore from "@/stores/subject";

function exportData() {
  const { subjects } = useSubjectStore.getState();
  const json = JSON.stringify(subjects);
  const blob = new Blob([json], { type: "application/json" });
  const a = document.createElement("a");
  a.download = "count.json";
  a.href = URL.createObjectURL(blob);
  a.click();
  a.remove();
}

function importData(file: File) {
  if (!file) return;
  const { importSubjects } = useSubjectStore.getState();

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsedData = JSON.parse(reader.result as string);
      importSubjects(parsedData);
    } catch (e) {
      console.error(e);
    }
  }
  reader.readAsText(file);
}

export { exportData, importData };
