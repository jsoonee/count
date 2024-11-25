import { useItem } from "../../../context/ItemContext";

export default ({ id }: { id: string | undefined }) => {
  const { list } = useItem();
  return (
    <>
      {list.length ? (
        <div className="items-grid">
          {list
            .find(({ subjectId }) => subjectId === id)
            ?.items.map(({ itemId, name, count }) => (
              <div key={itemId}>
              <div>{name}</div>
              <div>{count}</div>
              </div>
            ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
