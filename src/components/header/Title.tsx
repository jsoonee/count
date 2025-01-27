import { useItem } from "../../context/ItemContext";

export default ({ title }: { title: string }) => {
  const { currentSub, list } = useItem();
  function getTitle(t: string) {
    if (t === "sub") {
      return list.find(({subjectId}) => subjectId === currentSub)?.name;
    } else if (t === "cnt") {
      return list.length + " subjects";
    }
  }
  return <div className="title">{getTitle(title)}</div>;
};
