import TopMenu from "./TopMenu";
import Subjects from "./Subjects";
import Logo from "./Logo";
import {
  TablerSettings,
  TablerSidebarLeftCollapse,
  TablerSidebarLeftExpand,
} from "@/lib/Icons";
import useIsMobile from "@/hooks/useIsMobile";
import { useEffect, useState } from "react";
import useModalStore from "@/stores/modal";
import { MenuButtonLarge } from "@/layouts/MenuButton";
import { buttonMenuHoverColors } from "@/styles/colors";
import useConfigStore from "@/stores/config";

export default function Sidebar() {
  const color = useConfigStore((state) => state.color);
  const isMobile = useIsMobile();
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(
    isMobile ? false : true
  );
  const { submitted, setSubmitted } = useModalStore((state) => state);
  useEffect(() => {
    setIsOpenSidebar(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    closeSidebar();
    setSubmitted(false);
  }, [submitted]);

  function closeSidebar() {
    if (isMobile) setIsOpenSidebar(false);
  }

  return (
    <>
      <button
        className={`absolute rounded-sm top-4 p-1 z-2 ${
          isMobile && isOpenSidebar
            ? "right-2"
            : isOpenSidebar
            ? "left-70"
            : "left-2"
        } ${buttonMenuHoverColors[color]}`}
        onClick={() => setIsOpenSidebar(!isOpenSidebar)}
      >
        {isOpenSidebar ? (
          <TablerSidebarLeftCollapse className="size-6" />
        ) : (
          <TablerSidebarLeftExpand className="size-6" />
        )}
      </button>
      {isOpenSidebar ? (
        <>
          <aside
            className={`flex shrink-0 z-1 px-4 bg-neutral-50 dark:bg-neutral-800 ${
              isMobile ? "absolute w-full h-screen" : "w-xs"
            }`}
          >
            <div className="w-full flex flex-col justify-between">
              <div className="w-full">
                <Logo closeSidebar={closeSidebar} />
                <hr className="border-[#ddd] my-4" />
                <TopMenu closeSidebar={closeSidebar} />
                <Subjects closeSidebar={closeSidebar} />
              </div>
              <div>
                {/* <button className="flex items-center w-full hover:bg-black/10 dark:hover:bg-white/10 p-2 my-4 rounded-lg">
                  <TablerSettings />
                  <div className="w-auto ml-2">
                    <div className="justify-start">Settings</div>
                  </div>
                </button> */}
                <MenuButtonLarge>
                  <TablerSettings />
                  <div className="w-auto ml-2">
                    <div className="justify-start">Settings</div>
                  </div>
                </MenuButtonLarge>
              </div>
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
}
