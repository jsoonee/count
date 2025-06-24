import { MenuButtonLarge } from "@/layouts/MenuButton";
import { TablerHome } from "@/lib/Icons";
import { useNavigate } from "@tanstack/react-router";

export default function TopMenu({
  closeSidebar,
}: {
  closeSidebar: () => void;
}) {
  const navigate = useNavigate();

  function handleHomeClick() {
    navigate({ to: "/" });
    closeSidebar();
  }

  return (
    <MenuButtonLarge
      // className="flex items-center w-full hover:bg-black/10 dark:hover:bg-white/10 p-2 rounded-lg"
      onClick={() => handleHomeClick()}
    >
      <TablerHome />
      <div className="w-auto ml-2">
        <div className="justify-start">Home</div>
      </div>
    </MenuButtonLarge>
  );
}
