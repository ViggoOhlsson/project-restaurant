import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <nav className="nav">
        <div className="nav__logo--container">
          <Link to="/">
            <img src={require("../assets/logoo.png")} alt="Logo" />
          </Link>
        </div>
        {/* <Link to="/">Home</Link> 
        <Link to="/book">Create Booking</Link> 
        <Link to="/admin">Admin</Link> 
        <Link to="/test">404 test</Link>  */}
      </nav>
      <Outlet></Outlet>
    </>
  );
}
