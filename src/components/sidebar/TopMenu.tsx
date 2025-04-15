import { TablerHome } from "@/lib/Icons";
import { Link } from "@tanstack/react-router";

export default function TopMenu() {
  return (
    <Link to="/">
      <button className="flex items-center w-full hover:bg-black/10 dark:hover:bg-white/10 p-2 rounded-lg">
        <TablerHome />
        <div className="w-auto ml-2">
          <div className="justify-start">Home</div>
        </div>
      </button>
    </Link>
  );
}
