import useSubjectStore from "@/stores/subject";
import Empty from "./Empty";
import useModalStore from "@/stores/modal";
import Card from "./Card";
import Sort from "../Sort";
import { TablerPlus } from "@/lib/Icons";
import { buttonSolidColors } from "@/styles/colors";
import useConfigStore from "@/stores/config";
import Subject from "../modal/subject";
import Header from "../modal/Header";

export default function Subjects() {
  const subjects = useSubjectStore((state) => state.subjects);
  const openModal = useModalStore((state) => state.openModal);
  const color = useConfigStore((state) => state.color);

  return (
    <main className="">
      <div className="flex justify-between items-center">
        <h1 className="ml-12 text-2xl font-medium">Subjects</h1>
        <button
          className={`flex justify-center items-center p-2 my-2 pl-4 pr-5 rounded-lg ${buttonSolidColors[color]}`}
          onClick={() =>
            openModal(
              <>
                <Header title="Add subject"></Header>
                <Subject />
              </>
            )
          }
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
    </main>
  );
}
