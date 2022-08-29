import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IBooking } from "../../models/IBooking";

const linkStyle = {
  color: "#928D8D",
  textDecoration: "none",
};

export function CustomerCancel() {
  const [params, setParams] = useState(useParams());

  const [id, setId] = useState(params.id);

  const [deleteBooking, setDeleteBooking] = useState(false);

  const [booking, setBooking] = useState<IBooking>({
    date: new Date(),
    time: 0,
    guests: 0,
    customer: {
      _id: "",
      name: "",
      email: "",
      phone: 0,
    },
    _id: "",
  });

  //Anropar api och hämtar alla bokningar
  useEffect(() => {
    axios.get("http://localhost:8000/getbooking?id=" + id).then((res) => {
      console.log(res);
      setBooking(res.data);
    });
  }, []);

  useEffect(() => {
    if (!deleteBooking) return;
    axios.post("http://localhost:8000/cancel/" + id).then((res) => {
      console.log(res);
    });
  });

  function deleteReservation() {
    setDeleteBooking(true);
  }

  return (
    <>
      {!deleteBooking ? (
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
                  {new Date(booking.date).toDateString()}
                </span>
              </div>
              <div className="cancel__container--box__bookings-booking-info">
                <p className="cancel__container--box__bookings-booking-info__heading">
                  Guests
                </p>
                <span className="cancel__container--box__bookings-booking-info__values">
                  {booking.guests}
                </span>
              </div>
              <div className="cancel__container--box__bookings-booking-info">
                <p className="cancel__container--box__bookings-booking-info__heading">
                  Time
                </p>
                <span className="cancel__container--box__bookings-booking-info__values">
                  {booking.time}
                </span>
              </div>
            </div>
            <div className="cancel__container--box-customer-info">
              <p className="cancel__container--box-customer-info__heading">
                Contact information
              </p>
              <span className="cancel__container--box-customer-info__values">
                {booking.customer.name}
              </span>
              <span className="cancel__container--box-customer-info__values">
                {booking.customer.phone}
              </span>
              <span className="cancel__container--box-customer-info__values">
                {booking.customer.email}
              </span>
            </div>
            <div className="cancel__container--box-buttons">
              <button
                onClick={deleteReservation}
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
      ) : (
        <p>hej</p>
      )}
    </>
  );
}
