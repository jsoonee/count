import { useItem } from "../../context/ItemContext";
import Subjects from "./subjects";
import NoSub from "./subjects/NoSub";
// import ama from "./7.png";
import "./main.scss";
import { TablerPlus } from "../../lib/Icons";
import { Link, useLocation } from "react-router-dom";

export default () => {
  const { state } = useItem();
  let location = useLocation();
  
  return (
    <main className="main">
      {state.length ? <Subjects /> : <NoSub />}
      <Link to="/add" state={{ backgroundLocation: location }}>
        <button className="button-rec button-pri add-subject-main">
          <span className="inner-icon">
            <TablerPlus />
          </span>
          Add
        </button>
      </Link>
    </main>
  );
};
