import { useState } from "react";
import { Link } from "react-router-dom";
import { IBooking } from "../models/IBooking";

interface IEditConfirmedProps {
  booking: IBooking;
}

export const EditConfirmed = (props: IEditConfirmedProps) => {
  const [months, setMonths] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [month, setMonth] = useState(
    months[new Date(props.booking.date).getMonth()]
  );

  const [date, setDate] = useState(new Date(props.booking.date).getDate());

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="admin-edit">
      <h3 className="admin-edit__section admin-edit__section--heading">
        Reservation updated
      </h3>
      <div className="admin-edit__section admin-edit__section--image">
        <img src={require("../assets/success.png")} alt="Success" />
      </div>
      <div className="admin-edit__section admin-edit__section--overview">
        <div className="overview__info">
          <div className="overview__date">
            <h4 className="overview__heading">Date</h4>
            <span>
              {month} {date.toString()}{" "}
            </span>
          </div>
          <div className="overview__guests">
            <h4>Guests</h4>
            <span>{props.booking.guests}</span>
          </div>
          <div className="overview__time">
            <h4>Time</h4>
            <span>{props.booking.time}</span>
          </div>
        </div>
        <div className="overview__contact">
          <h4>Contact information</h4>
          <div className="overview__user">
            <span>{props.booking.customer.name}</span>
            <span>{props.booking.customer.phone}</span>
            <span>{props.booking.customer.email}</span>
          </div>
        </div>
      </div>
      <div className="admin-edit__section admin-edit__section--redirect">
        <button onClick={refreshPage} className="redirect__editButton"><i className="fa-solid fa-arrow-left"></i> Edit changes</button>
        <Link to={"/admin"} className="redirect__adminButton">Proceed to bookings <i className="fa-solid fa-arrow-right"></i></Link>
      </div>
    </div>
  );
};
