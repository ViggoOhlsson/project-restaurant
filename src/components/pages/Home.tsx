import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <div className="home">
        <div className="home__logo">
          <img src={require("../../assets/hero-img.png")} alt="Logo" />
        </div>
        <div className="home__arrow">
          <Link to="/book">
            <img
              src={require("../../assets/arrow-down-3101 (2).png")}
              alt="Arrow"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
