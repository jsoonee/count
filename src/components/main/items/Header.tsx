import React, { useState } from "react";
import { useItem } from "../../../context/ItemContext";
import { TablerSearch, TablerX } from "../../../lib/Icons";

export default ({ id }: { id: string | undefined }) => {
  const [name, setName] = useState<string>("");
  const { dispatch } = useItem();
  // const navigate = useNavigate();
  // const items = id && list.find((sub) => sub.id === id);
  // useEffect(() => {
  //   if (!items) navigate("/");
  // });
  // function onItemSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   if (!id) return;
  //   dispatch({
  //     type: "ADD_ITEM",
  //     isCurrentSub: true,
  //     subjectId: +id,
  //     newName: name,
  //   });
  //   console.log(list);
  // }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      dispatch({
        type: "ADD_ITEM",
        isCurrentSub: true,
        sid: id,
        newName: name,
      });
    }
  }

  return (
    <section className="subject-header">
      <div className="item-search">
        <div className="input-icon">
          <TablerSearch />
        </div>
        <input
          type="text"
          className="input input-lg item-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />
        <div className="input-icon button-clear">
          <TablerX />
        </div>
      </div>
    </section>
  );
};
