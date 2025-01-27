import { Link, useLocation } from "react-router";
import { TablerPlus } from "../../../lib/Icons";

export default () => {
  let location = useLocation();
  return (
    <Link to="/add" state={{ backgroundLocation: location }}>
      <button className="button-rec button-pri add-subject-main">
        <span className="inner-icon">
          <TablerPlus />
        </span>
        Add
      </button>
    </Link>
  );
};
