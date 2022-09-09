import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <div className="home">
        <div className="home__logo">
          <img src={require("../../assets/hero-img.png")} alt="Logo" />
        </div>
        <div className="home__container">
          <Link to="/book">
            <button className="home__container__button" role="button">
              Reserve a table
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
