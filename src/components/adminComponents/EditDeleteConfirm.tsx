import { Link } from "react-router-dom";

export const EditDeleteConfirm = () => {
  return (
    <div className="admin-edit">
      <h3 className="admin-edit__section admin-edit__section--heading">
        Reservation deleted
      </h3>
      <div className="admin-edit__section admin-edit__section--image">
        <img src={require("../../assets/success.png")} alt="Success" />
      </div>
      <div className="admin-edit__section admin-edit__section--redirect">
        <Link to={"/admin"} className="redirect__adminButton">
          Proceed to bookings <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};
