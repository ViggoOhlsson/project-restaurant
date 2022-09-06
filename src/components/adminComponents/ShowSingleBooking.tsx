import { Link } from "react-router-dom";
import { IBooking } from "../../models/IBooking";

interface IShowSingleBookingProps {
  booking: IBooking;
  deleteReservation(): void;
}

const linkStyle = {
  color: "#928D8D",
  textDecoration: "none",
};

export function ShowSingleBooking(props: IShowSingleBookingProps) {
  return (
    <>
      <div className="cancel__container">
        <div className="cancel__container--text">
          <i className=" cancel__container--text fa-solid fa-circle-exclamation"></i>
          <p>Are you sure you want to cancel this reservation?</p>
        </div>
        <div className="cancel__container--box">
          <div className="cancel__container--box__bookings">
            <div className="cancel__container--box__bookings-booking-info">
              <p className="cancel__container--box__bookings-booking-info__heading">
                Date
              </p>
              <span className="cancel__container--box__bookings-booking-info__values">
                {new Date(props.booking.date).toDateString()}
              </span>
            </div>
            <div className="cancel__container--box__bookings-booking-info">
              <p className="cancel__container--box__bookings-booking-info__heading">
                Guests
              </p>
              <span className="cancel__container--box__bookings-booking-info__values">
                {props.booking.guests}
              </span>
            </div>
            <div className="cancel__container--box__bookings-booking-info">
              <p className="cancel__container--box__bookings-booking-info__heading">
                Time
              </p>
              <span className="cancel__container--box__bookings-booking-info__values">
                {props.booking.time}
              </span>
            </div>
          </div>
          <div className="cancel__container--box-customer-info">
            <p className="cancel__container--box-customer-info__heading">
              Contact information
            </p>
            <span className="cancel__container--box-customer-info__values">
              {props.booking.customer.name}
            </span>
            <span className="cancel__container--box-customer-info__values">
              {props.booking.customer.phone}
            </span>
            <span className="cancel__container--box-customer-info__values">
              {props.booking.customer.email}
            </span>
          </div>
          <div className="cancel__container--box-buttons">
            <button
              onClick={props.deleteReservation}
              className="cancel__container--box-buttons__delete"
            >
              Yes, I'm sure!
            </button>
            <button className="cancel__container--box-buttons__regret">
              <Link to={"/"} style={linkStyle}>
                No, keep my table!
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
