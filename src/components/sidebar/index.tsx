import TopMenu from "./TopMenu";
import Subjects from "./Subjects";
import Logo from "./Logo";
import { TablerSettings } from "@/lib/Icons";

export default function Sidebar() {
  return (
    <aside className="flex shrink-0 w-xs px-4 rounded-r-2xl bg-neutral-50 dark:bg-neutral-800">
      <div className="w-full flex flex-col justify-between">
        <div className="w-full">
          <Logo />
          <hr className="border-[#ddd] my-4" />
          <TopMenu />
          <Subjects />
        </div>
        <div>
          <button className="flex items-center w-full hover:bg-black/10 dark:hover:bg-white/10 active:bg-blue-400 p-2 my-4 rounded-lg">
            <TablerSettings />
            <div className="w-auto ml-2">
              <div className="justify-start">Settings</div>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
