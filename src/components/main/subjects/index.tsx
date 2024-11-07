import { Link } from "react-router-dom";
import { useItem } from "../../../context/ItemContext";
import AddButton from "./AddButton";
import NoSub from "./NoSub";

export default () => {
  const { list } = useItem();
  return (
    <>
      {list.length ? (
        <div className="subjects-grid">
          {list.map(({ subjectId, name, items }) => (
            <Link key={subjectId} to={`/sub/${subjectId}`}>
              <div className="card subject-container">
                <div className="subject-name">{name}</div>
                <div className="subject-count">{items.length}</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <NoSub />
      )}
      <AddButton />
    </>
  );
};
