import { useItem } from "../../../context/ItemContext";

export default ({ id }: { id: string | undefined }) => {
  const { list } = useItem();
  return (
    <>
      {list.length ? (
        <div className="items-grid">
          {list
            .find(({ subjectId }) => subjectId === id)
            ?.items.map(({ itemId, name }) => (
              <div key={itemId}>{name}</div>
            ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
