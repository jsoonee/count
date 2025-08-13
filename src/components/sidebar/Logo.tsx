import { useNavigate } from "@tanstack/react-router";

import { MdiCount } from "@/lib/Icons";
import useConfigStore from "@/stores/config";
import { buttonSidebarMenuHoverColors, logoColors } from "@/styles/colors";

export default function Logo({ closeSidebar }: { closeSidebar: () => void }) {
  const navigate = useNavigate();
  const color = useConfigStore((state) => state.color);

  function handleLogoClick() {
    navigate({ to: "/" });
    closeSidebar();
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mx-4 mt-4">
        <button
          className={`px-2 py-1 rounded-md flex items-center ${buttonSidebarMenuHoverColors[color]}`}
          onClick={() => handleLogoClick()}
        >
          <div className={logoColors[color]}>
            <MdiCount className="size-12 mr-2" />
          </div>
          <div>Count</div>
        </button>
        <div></div>
      </div>
    </div>
  );
}
