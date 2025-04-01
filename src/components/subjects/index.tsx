import useSubjectStore from "@/stores/subject";
import Empty from "./Empty";
import AddSubject from "../modal/content/AddSubject";
import useModalStore from "@/stores/modal";
import Card from "./Card";

export default function Subjects() {
  const subjects = useSubjectStore(state => state.subjects);
  const { openModal } = useModalStore();

  return (
    <>
      {subjects.length ? <Card /> : <Empty />}
      <button onClick={() => openModal(<AddSubject />)}>Add</button>
    </>
  );
}
