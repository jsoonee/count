import { useItem } from "../../context/ItemContext";

export default () => {
  const { state } = useItem();
  return(
    <div className="title">{state.length} subjects</div>
  );
}