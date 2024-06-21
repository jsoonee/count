import { Link, useLocation } from "react-router-dom";
import { useModal } from "../../context/ModalContext";

export default () => {
  const { setModalId } = useModal();
  let location = useLocation();
  return (
    <main className="main">
      <Link to="/add" state={{ backgroundLocation: location }}>
        <button
          onClick={() => {
            setModalId(1);
            console.log("AddSub");
          }}
        >
          Add
        </button>
      </Link>
    </main>
  );
};
