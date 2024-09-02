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
          {list.map(({ id, name, items }, index) => (
            <Link key={index} to={`/sub/${id}`}>
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
