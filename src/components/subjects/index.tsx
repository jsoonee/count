import useSubjectStore from "@/stores/subject";
import Empty from "./Empty";
import AddSubject from "../modal/content/AddSubject";
import useModalStore from "@/stores/modal";
import Card from "./Card";
import Sort from "../Sort";

export default function Subjects() {
  const subjects = useSubjectStore(state => state.subjects);
  const openModal = useModalStore(state => state.openModal);

  return (
    <main className="">
      {subjects.length ? <Card /> : <Empty />}
      <Sort isSubject={true} />
      <button onClick={() => openModal(<AddSubject />)}>Add</button>
    </main>
  );
}
