import { useNavigate } from "@tanstack/react-router";

import { TablerCircle, TablerPlus } from "@/lib/Icons";
import useSubjectStore from "@/stores/subject";
import useModalStore from "@/stores/modal";
import { buttonSolidColors } from "@/styles/colors";
import useConfigStore from "@/stores/config";
import { MenuButtonSelectedSmall, MenuButtonSmall } from "@/layouts/MenuButton";
import Header from "../modal/Header";
import EditSubject from "../modal/EditSubject";

export default function Subjects({
  closeSidebar,
}: {
  closeSidebar: () => void;
}) {
  const { sorted, currentSubject, setCurrentSubject } = useSubjectStore(
    (state) => state
  );
  const color = useConfigStore((state) => state.color);
  const openModal = useModalStore((state) => state.openModal);
  const navigate = useNavigate();

  function handleSubjectClick(subjectId: string) {
    setCurrentSubject(subjectId);
    navigate({ to: "/sub/$subId", params: { subId: subjectId } });
    closeSidebar();
  }

  return (
    <>
      {sorted.length ? (
        <>
          <div className="font-medium text-sm mt-8 mb-2 ml-2">SUBJECTS</div>
          <ul className="">
            {sorted.map(({ id, name, emoji, items }) => {
              const sum = items.reduce((acc, cur) => acc + cur.count, 0);
              const inner = (
                <>
                  <div className="flex items-center">
                    <div className="px-2">
                      {emoji ? (
                        <div className="text-xl aspect-square">{emoji}</div>
                      ) : (
                        <div className="flex justify-center w-7 text-[#777]">
                          <TablerCircle />
                        </div>
                      )}
                    </div>
                    <div>{name}</div>
                  </div>
                  <div>
                    {sum} / {items.length}
                  </div>
                </>
              );
              return (
                <li key={id} className="my-1">
                  {currentSubject === id ? (
                    <MenuButtonSelectedSmall className="justify-between pr-2">
                      {inner}
                    </MenuButtonSelectedSmall>
                  ) : (
                    <MenuButtonSmall
                      className="justify-between pr-2"
                      onClick={() => handleSubjectClick(id)}
                    >
                      {inner}
                    </MenuButtonSmall>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
      <button
        className={`flex justify-center items-center w-full p-2 my-4 rounded-lg ${buttonSolidColors[color]}`}
        onClick={() =>
          openModal(
            <>
              <Header title="Add subject"></Header>
              <EditSubject />
            </>
          )
        }
      >
        <TablerPlus />
        <div className="ml-2">Add new subject</div>
      </button>
    </>
  );
}
