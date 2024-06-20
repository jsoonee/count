// // import React, { useEffect, useState } from "react";
// // import ModalHeader from "./ModalHeader";
// // // import { IModalHook } from "../../context/ModalContext";
// // import { IModalInfo } from ".";

// import { useEffect } from "react";
// import { useModal } from "../../context/ModalContext";

// // interface IModalContentProps {
// //   modalInfo: IModalInfo;
// //   setModalNum: React.Dispatch<React.SetStateAction<number>>;
// // }

// // export default ({ setModalNum, modalInfo }: IModalContentProps) => {
// //   const [open, setOpen] = useState<boolean>(false);

// //   useEffect(() => {
// //     window.addEventListener("keydown", handleEscapeClick);
// //     return () => {
// //       window.removeEventListener("keydown", handleEscapeClick);
// //     };
// //   });

// //   useEffect(() => {
// //     if (!open) setOpen(true);
// //   }, [modalInfo]);

// //   function closeModal() {
// //     setOpen(false);
// //     setTimeout(() => {
// //       setModalNum(0);
// //     }, 200);
// //   }

// //   function handleOutsideClick(e: React.MouseEvent) {
// //     if (e.target === e.currentTarget) {
// //       closeModal();
// //     }
// //   }

// //   function handleEscapeClick(e: KeyboardEvent) {
// //     if (e.key === "Escape") {
// //       closeModal();
// //     }
// //   }

// //   return (
// //     <div
// //       className="modal-overlay"
// //       onClick={handleOutsideClick}
// //       style={{ opacity: open ? 1 : 0 }}
// //     >
// //       <section className="modal-content">
// //         <ModalHeader title={modalInfo.title} closeModal={closeModal} />
// //         {modalInfo.content}
// //       </section>
// //     </div>
// //   );
// // };

// export default () => {
//   const { modalId, setModalId } = useModal();

//   function closeModal() {

//   }

//   function handleEscapeClick(e: KeyboardEvent) {
//     if (e.key === "Escape") closeModal()
//   }

//   useEffect(() => {
//     window.addEventListener("keydown", handleEscapeClick);
//     return () => {
//       window.removeEventListener("keydown", handleEscapeClick);
//     };
//   });

//   return (
//     <div
//       className="modal-overlay"
//       onClick={handleOutsideClick}
//       style={{ opacity: open ? 1 : 0 }}
//     >
//       <section className="modal-content">
//         <ModalHeader title={modalInfo.title} closeModal={closeModal} />
//         {modalInfo.content}
//       </section>
//     </div>
//   );
// };
