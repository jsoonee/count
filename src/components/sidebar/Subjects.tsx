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
            {sorted.map(({ id, name, items }) => {
              const sum = items.reduce((acc, cur) => acc + cur.count, 0);
              return (
                <li
                  key={id}
                  className="flex"
                  onClick={() => handleSubjectClick(id)}
                >
                  <div>{name}</div>
                  <div>{sum}</div>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </>
  );
}
