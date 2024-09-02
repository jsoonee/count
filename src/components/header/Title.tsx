import { useItem } from "../../context/ItemContext";

export default () => {
  const { list } = useItem();
  return <div className="title">{list.length} subjects</div>;
};
