import { useModal } from "../../context/ModalContext";

export default () => {
  const { setModalId } = useModal();
  return (
    <button
      onClick={() => {
        setModalId(1);
        console.log("AddSub");
      }}
    >
      Add
    </button>
  );
};
