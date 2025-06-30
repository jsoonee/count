import Header from "@/components/modal/Header";
import EditSubject from "@/components/modal/EditSubject";
import {
  MdiInfomation,
  TaberTrash,
  TablerEdit,
  TablerInfoCircle,
  TablerInfoFilled,
} from "@/lib/Icons";
import useModalStore from "@/stores/modal";
import useSubjectStore from "@/stores/subject";
import React from "react";
import DeleteConfirm from "@/components/modal/DeleteConfirm";

export default function CardMenu({ subjectId, setOpenMenu, menuRef }) {
  const openModal = useModalStore((state) => state.openModal);
  const removeSubject = useSubjectStore((state) => state.removeSubject);

  function handleEditClick(e: React.MouseEvent) {
    setOpenMenu(null);
    openModal(
      <>
        <Header title="Edit subject" />
        <EditSubject subjectEditId={subjectId} />
      </>
    );
  }

  function handleDeleteClick() {
    setOpenMenu(null);
    openModal(
      <>
        <Header title="Delete Subject"></Header>
        <DeleteConfirm subjectId={subjectId}/>
      </>
    );
  }

  return (
    <div
      className={`absolute top-12 cursor-default right-0 z-2 p-1 rounded-lg bg-white dark:bg-black`}
      ref={menuRef}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
    >
      <div className="flex p-1 my-1" onClick={(e) => handleEditClick(e)}>
        <TablerEdit />
        <div className="ml-1">Edit</div>
      </div>
      <div className="flex p-1 my-1">
        <MdiInfomation />
        <div className="ml-1">View Details</div>
      </div>
      <div className="flex p-1 my-1" onClick={() => handleDeleteClick()}>
        <TaberTrash className="text-red-700" />
        <div className="ml-1">Delete</div>
      </div>
    </div>
  );
}
