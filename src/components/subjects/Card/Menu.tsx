import React from "react";

import DeleteConfirm from "@/components/modal/DeleteConfirm";
import Header from "@/components/modal/Header";
import EditSubject from "@/components/modal/EditSubject";
import {
  MdiInfomation,
  TaberTrash,
  TablerEdit,
} from "@/lib/Icons";
import useModalStore from "@/stores/modal";
import { buttonSidebarMenuHoverColors, menuHoverColors } from "@/styles/colors";
import useConfigStore from "@/stores/config";

export default function CardMenu({ subjectId, setOpenMenu, menuRef }) {
  const openModal = useModalStore((state) => state.openModal);
  const color = useConfigStore((state) => state.color);

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
      className={`absolute top-12 cursor-default right-0 z-2 border-1 rounded-lg *:flex *:m-1 *:p-1 *:rounded-md bg-white dark:bg-[#111] border-gray-50 dark:border-gray-800`}
      ref={menuRef}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
    >
      <div className={buttonSidebarMenuHoverColors[color]} onClick={(e) => handleEditClick(e)}>
        <TablerEdit />
        <div className="ml-1">Edit</div>
      </div>
      <div className={buttonSidebarMenuHoverColors[color]}>
        <MdiInfomation />
        <div className="ml-1">View Details</div>
      </div>
      <div className={buttonSidebarMenuHoverColors[color]} onClick={() => handleDeleteClick()}>
        <TaberTrash className="text-red-700" />
        <div className="ml-1">Delete</div>
      </div>
    </div>
  );
}
