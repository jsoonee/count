import { useEffect, useState } from "react";

import {
  TablerSettings,
  TablerSidebarLeftCollapse,
  TablerSidebarLeftExpand,
} from "@/lib/Icons";
import useIsMobile from "@/hooks/useIsMobile";
import useModalStore from "@/stores/modal";
import { MenuButtonLarge } from "@/layouts/MenuButton";
import { buttonSidebarMenuHoverColors } from "@/styles/colors";
import useConfigStore from "@/stores/config";

import TopMenu from "./TopMenu";
import Subjects from "./Subjects";
import Logo from "./Logo";
import useMobileStore from "@/stores/mobile";
import Header from "../modal/Header";
import EditSubject from "../modal/EditSubject";
import Settings from "../modal/settings";

export default function Sidebar() {
  const color = useConfigStore((state) => state.color);
  // const isMobile = useIsMobile();
  // const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(
  //   isMobile ? false : true
  // );
  const { isMobile, isOpenSidebar, setIsOpenSidebar } = useMobileStore(
    (state) => state
  );
  const { submitted, setSubmitted } = useModalStore((state) => state);
  const openModal = useModalStore((state) => state.openModal);

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

  function handleSettingsClick() {
    openModal(
      <>
        <Header title="Settings" />
        <Settings />
      </>
    );
  }

  return (
    <>
      <button
        className={`absolute rounded-sm top-2 p-1 z-2 ${
          isMobile && isOpenSidebar
            ? "right-2"
            : isOpenSidebar
            ? "left-70"
            : "left-2"
        } ${buttonSidebarMenuHoverColors[color]}`}
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
              <MenuButtonLarge onClick={() => handleSettingsClick()}>
                <TablerSettings />
                <div className="ml-2">Settings</div>
              </MenuButtonLarge>
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
}
