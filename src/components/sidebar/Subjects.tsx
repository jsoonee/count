import { TablerCircle } from "@/lib/Icons";
import useSubjectStore from "@/stores/subject";
import { useNavigate } from "@tanstack/react-router";

export default function Subjects() {
  const { sorted, setCurrentSubject } = useSubjectStore((state) => state);
  const navigate = useNavigate();

  function handleSubjectClick(subjectId: string) {
    setCurrentSubject(subjectId);
    navigate({ to: "/sub/$subId", params: { subId: subjectId } });
  }

  return (
    <>
      {sorted.length ? (
        <>
          <div className="font-medium text-sm mt-8 ml-2">Subjects</div>
          <ul>
            {sorted.map(({ id, name, emoji, items }) => {
              const sum = items.reduce((acc, cur) => acc + cur.count, 0);
              return (
                <li key={id}>
                  <button
                    className="flex justify-between items-center w-full hover:bg-blue-300 active:bg-blue-400 py-1 rounded-sm"
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
                      )}</div>
                      <div>{name}</div>
                    </div>
                    <div>{sum} / {items.length}</div>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </>
  );
}
