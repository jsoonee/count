import { TablerCircle, TablerPlus } from "@/lib/Icons";
import useSubjectStore from "@/stores/subject";
import { useNavigate } from "@tanstack/react-router";
import AddSubject from "../modal/content/AddSubject";
import useModalStore from "@/stores/modal";

export default function Subjects() {
  const { sorted, setCurrentSubject } = useSubjectStore((state) => state);
  const openModal = useModalStore((state) => state.openModal);
  const navigate = useNavigate();

  function handleSubjectClick(subjectId: string) {
    setCurrentSubject(subjectId);
    navigate({ to: "/sub/$subId", params: { subId: subjectId } });
  }

  return (
    <>
      {sorted.length ? (
        <>
          <div className="font-medium text-sm mt-8 ml-2">SUBJECTS</div>
          <ul>
            {sorted.map(({ id, name, emoji, items }) => {
              const sum = items.reduce((acc, cur) => acc + cur.count, 0);
              return (
                <li key={id}>
                  <button
                    className="flex justify-between items-center w-full hover:bg-black/10 dark:hover:bg-white/10 py-1 rounded-sm"
                    onClick={() => handleSubjectClick(id)}
                  >
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
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
      <button
        className="flex justify-center items-center w-full p-2 my-4 text-white bg-black dark:bg-white dark:text-black rounded-lg"
        onClick={() => openModal(<AddSubject />)}
      >
        <TablerPlus />
        <div className="ml-2">Add new subject</div>
      </button>
    </>
  );
}
