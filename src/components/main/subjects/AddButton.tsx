import { Link } from "react-router-dom";
import { TablerPlus } from "../../../lib/Icons";

export default () => {  
  return (
    <Link to="/add">
      <button className="button-rec button-pri add-subject-main">
        <span className="inner-icon">
          <TablerPlus />
        </span>
        Add
      </button>
    </Link>
  );
};
