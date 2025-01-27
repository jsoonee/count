import { Link } from "react-router";
import { useItem } from "../../../context/ItemContext";
import AddButton from "./AddButton";
import NoSub from "./NoSub";

export default () => {
  const { list, dispatch } = useItem();
  function onCardClick(sid: string) {
    dispatch({ type: "ENTER_SUB", sid: sid });
  }
  return (
    <>
      {list.length ? (
        <div className="subjects-grid">
          {list.map(({ subjectId, name, items }) => (
            <Link
              key={subjectId}
              to={`/sub/${subjectId}`}
              onClick={() => onCardClick(subjectId)}
            >
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
