import useSubjectStore from "@/stores/subject";
import Empty from "./Empty";
import AddSubject from "../modal/content/AddSubject";
import useModalStore from "@/stores/modal";
import Card from "./Card";
import Sort from "../Sort";
import { TablerPlus } from "@/lib/Icons";

export default function Subjects() {
  const subjects = useSubjectStore((state) => state.subjects);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <main className="">
      <div className="flex justify-between items-center">
        <h1 className="ml-12 text-2xl font-medium">Subjects</h1>
        <button
          className="flex justify-center items-center p-2 my-2 pl-4 pr-5 text-white bg-black dark:bg-white dark:text-black rounded-lg"
          onClick={() => openModal(<AddSubject />)}
        >
          <TablerPlus className="size-[20px]" />
          <div className="ml-2">Add new subject</div>
        </button>
      </div>
      {subjects.length ? (
        <>
          <Card />
          <Sort isSubject={true} />
        </>
      ) : (
        <Empty />
      )}
      <button onClick={() => openModal(<AddSubject />)}>Add</button>
    </main>
  );
}
