import { Outlet } from "react-router-dom";
import Header from "../components/header";

export default () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}