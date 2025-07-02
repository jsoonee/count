import { useEffect } from "react";

import useSubjectStore from "@/stores/subject";
import useModalStore from "@/stores/modal";
import { TablerPlus } from "@/lib/Icons";
import { buttonSolidColors } from "@/styles/colors";
import useConfigStore from "@/stores/config";

import Sort from "../../layouts/Sort";
import EditSubject from "../modal/EditSubject";
import Header from "../modal/Header";
import Empty from "./Empty";
import Card from "./Card";
import useMobileStore from "@/stores/mobile";

export default function Subjects() {
  const { subjects, setCurrentSubject } = useSubjectStore((state) => state);
  const openModal = useModalStore((state) => state.openModal);
  const color = useConfigStore((state) => state.color);
  const isOpenSidebar = useMobileStore((state) => state.isOpenSidebar);

  useEffect(() => {
    setCurrentSubject("");
  }, []);

  return (
    <main>
      <div className={`flex justify-between items-center mx-6 ${isOpenSidebar ? "" : "pl-4"}`}>
        <h1 className="text-2xl font-medium">Subjects</h1>
        <div className="flex items-center">
          <Sort sortName="subject" className="mx-4" />
          <button
            className={`flex justify-center items-center p-2 my-2 pl-4 pr-5 rounded-lg ${buttonSolidColors[color]}`}
            onClick={() =>
              openModal(
                <>
                  <Header title="Add subject"></Header>
                  <EditSubject />
                </>
              )
            }
          >
            <TablerPlus className="size-[20px]" />
            <div className="ml-2">Add new subject</div>
          </button>
        </div>
      </div>
      {subjects.length ? <Card /> : <Empty />}
    </main>
  );
}
