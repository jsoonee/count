import { useModal } from "../../context/ModalContext";
import "./modal.scss";
// import Content from "./Content";
import React, { useEffect, useState } from "react";
import AddSub from "./contents/AddSub";
import Header from "./Header";
import { Route } from "react-router-dom";

interface IModal {
  id: number;
  path: string;
  title: string;
  content: React.ReactElement;
}

export default () => {
  const [open, setOpen] = useState<boolean>(false);
  const { modalId, setModalId } = useModal();

  const modals: IModal[] = [
    {
      id: 0,
      path: "add",
      title: "Add a subject",
      content: <AddSub closeModal={closeModal} />,
    },
  ];

  useEffect(() => {
    if (modalId) setOpen(true);
  }, [modalId]);

  function closeModal() {
    setOpen(false);
    setTimeout(() => {
      setModalId(0);
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

  if (!modalId) return;
  const { path, title, content } = modals[modalId - 1];
  return (
    <div
      className="modal-overlay"
      onClick={handleOutsideClick}
      onKeyDown={handleEscClick}
      style={{ opacity: open ? 1 : 0 }}
    >
      <section className="modal-content">
        <Header title={title} closeModal={closeModal} />
        {/* {content} */}
        <Route path={`/${path}`} element={content} />
      </section>
    </div>
  );
};
