import { Link } from "@tanstack/react-router";
import { MdiCount, TablerEdit } from "@/lib/Icons";
import EnterUsername from "../modal/content/EnterUsername";
import useModalStore from "@/stores/modal";
import useConfigStore from "@/stores/config";
import { useEffect } from "react";

export default function Logo() {
  const username = useConfigStore((state) => state.username);
  const openModal = useModalStore((state) => state.openModal);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mx-4 mt-4">
        <div className="flex items-center">
          <Link to="/">
            <MdiCount className="size-12 mr-2" />
          </Link>
          <div>Count</div>
        </div>
        <div></div>
        {/* <div className="flex items-center group">
          <div className="cursor-pointer mb-1">{username}</div>
          <TablerEdit
            className="ml-1 size-4 opacity-0 cursor-pointer group-hover:opacity-100"
            onClick={() => openModal(<EnterUsername />)}
          />
        </div> */}
      </div>
    </div>
  );
}
