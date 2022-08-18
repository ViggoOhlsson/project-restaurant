import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> 
        <Link to="/book">Create Booking</Link> 
        <Link to="/admin">Admin</Link> 
        <Link to="/test">404 test</Link> 
      </nav>
      <Outlet></Outlet>
    </>
  );
}
