import { createFileRoute } from "@tanstack/react-router";
import Subjects from "@/components/subjects";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Subjects />
  );
}
