import { Link } from "react-router-dom";

export function Header() {
  return (
    <>
      <nav className="nav">
        <div className="nav__logo--container">
          <Link to="/">
            <img src={require("../../assets/logoo.png")} alt="Logo" />
          </Link>
        </div>
      </nav>
    </>
  );
}
