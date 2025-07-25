import { useNavigate } from "@tanstack/react-router";

import { MenuButtonLarge } from "@/layouts/MenuButton";
import { TablerHome } from "@/lib/Icons";

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
    <MenuButtonLarge onClick={() => handleHomeClick()}>
      <TablerHome />
      <div className="ml-2">Home</div>
    </MenuButtonLarge>
  );
}
