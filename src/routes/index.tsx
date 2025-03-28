import { createFileRoute } from "@tanstack/react-router";
import Main from "@/components/main";
import Modal from "@/components/modal";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Main />
      <Modal />
    </>
  );
}
