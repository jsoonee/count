// import { useModal } from "../../context/ModalContext";
import "./modal.scss";
import React, { useEffect, useState } from "react";
import AddSub from "./contents/AddSub";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";

interface IModal {
  id: number;
  path: string;
  title: string;
  content: React.ReactElement;
}

export default () => {
  const { modalType } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  // const { modalId, setModalId } = useModal();
  console.log(modalType);
  const modals: IModal[] = [
    {
      id: 0,
      path: "add",
      title: "Add a subject",
      content: <AddSub closeModal={closeModal} />,
    },
  ];

  useEffect(() => {
    if (modalType) setOpen(true);
  }, [modalType]);

  function closeModal() {
    setOpen(false);
    setTimeout(() => {
      // setModalId(0);
      navigate(-1);
    }, 200);
  }

  function handleOutsideClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleEscClick(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      closeModal();
    }
  }

  const modal = modals.find(m => m.path === modalType)
  if (!modal) return;
  const { title, content } = modal;
  return (
    <div
      className="modal-overlay"
      onClick={handleOutsideClick}
      onKeyDown={handleEscClick}
      style={{ opacity: open ? 1 : 0 }}
    >
      <section className="modal-content">
        <Header title={title} closeModal={closeModal} />
        {content}
      </section>
    </div>
  );
};
