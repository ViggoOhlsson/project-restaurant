import { Link, Outlet } from "react-router-dom";
import { Footer } from "../layoutComponents/Footer";

export function HomeLayout() {
  return (
    <>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}
