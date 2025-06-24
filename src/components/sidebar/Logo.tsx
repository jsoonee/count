import { useNavigate } from "@tanstack/react-router";
import { MdiCount, TablerEdit } from "@/lib/Icons";
import EnterUsername from "../modal/content/EnterUsername";
import useModalStore from "@/stores/modal";
import useConfigStore from "@/stores/config";
import { useEffect } from "react";
import { buttonMenuHoverColors } from "@/styles/colors";

export default function Logo({ closeSidebar }: { closeSidebar: () => void }) {
  const navigate = useNavigate();
  const color = useConfigStore((state) => state.color);

  function handleLogoClick() {
    navigate({ to: "/" });
    closeSidebar();
  }

  return (
    <div className="w-full">
      <div
        className="flex justify-between items-center mx-4 mt-4"
      >
        <button className={`px-2 py-1 rounded-md flex items-center${" "+buttonMenuHoverColors[color]}`} onClick={() => handleLogoClick()}>
          <div>
            <MdiCount className="size-12 mr-2" />
          </div>
          <div>Count</div>
        </button>
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
