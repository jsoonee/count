import { MdiCount, TablerEdit, TablerHome } from "@/lib/Icons";
import useModalStore from "@/stores/modal";
import { Link } from "@tanstack/react-router";
import EnterUsername from "../modal/content/EnterUsername";
import useConfigStore from "@/stores/config";
import Subjects from "./Subjects";

export default function Sidebar() {
  const username = useConfigStore((state) => state.username);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <aside className="w-xs flex flex-col flex-shrink-0 px-4 rounded-r-2xl bg-neutral-50">
      <div className="w-full">
        <div className="flex items-center mx-4 mt-4">
          <Link to="/">
            <MdiCount className="size-12 mr-2" />
          </Link>
          <div className="flex items-center group">
            <div className="cursor-pointer mb-1">{username}</div>
            <TablerEdit
              className="ml-1 size-4 opacity-0 cursor-pointer group-hover:opacity-100"
              onClick={() => openModal(<EnterUsername />)}
            />
          </div>
        </div>
      </div>
      <hr className="border-[#ddd] my-4" />
      <Link to="/">
        <button className="flex items-center w-full hover:bg-blue-300 active:bg-blue-400 p-2 rounded-lg">
          <TablerHome />
          <div className="w-auto ml-2">
            <div className="justify-start">Home</div>
          </div>
        </button>
      </Link>
      <Subjects />
    </aside>
  );
}
