import useConfigStore from "@/stores/config";
import {
  buttonSidebarMenuHoverColors,
  menuSelectedColors,
} from "@/styles/colors";
import React from "react";

interface IMenuButton {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler;
}

export function MenuButtonSmall({ children, className, onClick }: IMenuButton) {
  const color = useConfigStore((state) => state.color);
  return (
    <button
      className={`flex w-full py-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function MenuButtonSelectedSmall({ children, className }: IMenuButton) {
  const color = useConfigStore((state) => state.color);
  return (
    <button className={`flex w-full py-1 rounded ${menuSelectedColors[color]} ${className || ""}`}>
      {children}
    </button>
  );
}

export function MenuButtonLarge({ children, onClick }: IMenuButton) {
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
