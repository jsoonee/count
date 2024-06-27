import { useItem } from "../../../context/ItemContext";

export default () => {
  const { state } = useItem();
  return (
    <div className="subjects-grid">
      {state.map(({ id, name, items }) => (
        <div key={id} className="card subject-container">
          <div className="subject-name">{name}</div>
          <div className="subject-count">{items.length}</div>
        </div>
      ))}
    </div>
  );
};
