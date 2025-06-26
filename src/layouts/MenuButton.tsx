import useConfigStore from "@/stores/config";
import { buttonSidebarMenuHoverColors } from "@/styles/colors";
import React from "react";

export function MenuButtonSmall({children,className, onClick}: {children: React.ReactNode, className?: string, onClick?: React.MouseEventHandler}) {
    const color = useConfigStore((state) => state.color);
  return (
    <button
      className={`flex w-full py-1 rounded-md ${buttonSidebarMenuHoverColors[color]} ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function MenuButtonLarge({children, onClick}: {children: React.ReactNode, onClick?: React.MouseEventHandler}) {
  const color = useConfigStore((state) => state.color);
  return (
    <button
      className={`flex items-center w-full p-2 my-4 rounded-lg ${buttonSidebarMenuHoverColors[color]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
} 
