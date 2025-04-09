import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Sidebar from "@/components/sidebar";
import Modal from "@/components/modal";
import Header from "@/components/header";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div id="app" className="w-full h-screen flex select-none">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <Outlet />
        </div>
        <Modal />
      </div>
    </React.Fragment>
  );
}
