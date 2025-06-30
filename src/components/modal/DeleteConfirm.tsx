import useConfigStore from "@/stores/config";
import useModalStore from "@/stores/modal";
import useSubjectStore from "@/stores/subject";
import { buttonSolidColors } from "@/styles/colors";

export default function DeleteConfirm({ subjectId }: { subjectId: string }) {
  const { subjects, removeSubject } = useSubjectStore((state) => state);
  const name = subjects.find((sub) => sub.id === subjectId)?.name;
  const closeModal = useModalStore((state) => state.closeModal);
  const color = useConfigStore((state) => state.color);

  function handleDeleteClick() {
    removeSubject(subjectId);
    closeModal();
  }

  return (
    <>
      <div className="p-6">
        <span>Are you sure you want to delete the subject </span>
        <span className="font-semibold">{name}</span>
        <span> ?</span>
      </div>
      <div className="flex justify-end p-6">
        <button
          type="button"
          className="h-10 mr-4 border rounded-sm px-4 text-[#222] dark:text-[#eee] border-[#eee] dark:border-[#333] hover:bg-[#f4f4f4] dark:hover:bg-[#222]"
          onClick={() => closeModal()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`h-10 rounded-sm px-4 ${buttonSolidColors[color]}`}
          onClick={() => handleDeleteClick()}
        >
          Delete
        </button>
      </div>
    </>
  );
}
