import { Link, Outlet } from "react-router-dom";
import { Header } from "../layoutComponents/Header";

export function AdminLayout() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
}
