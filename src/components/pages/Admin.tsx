import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBooking } from "../../models/IBooking";

export function Admin() {
  const [bookings, setBookings] = useState<IBooking[]>([]);

  const [sortedBookings, setSortedBookings] = useState<IBooking[]>([]);

  const [earlyBooking, setEarlyBooking] = useState<IBooking[]>([]);

  const [lateBooking, setLateBooking] = useState<IBooking[]>([]);

  const [date, setDate] = useState("");

  //Anropar api och hämtar alla bokningar
  useEffect(() => {
    axios.get("http://localhost:8000/getallbookings").then((res) => {
      console.log(res);
      setBookings(res.data);
    });
  }, []);

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  function changeDate(e: ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value);
  }

  function findBooking(findDate: string) {
    let newDate = new Date(findDate);
    for (let i = 0; i < bookings.length; i++) {
      let found = false;
      if (bookings[i].date.toString() === newDate.toISOString()) {
        for (let i = 0; i < sortedBookings.length; i++) {
          if (sortedBookings[i]._id === bookings[i]._id) {
            found = true;
          }
        }
        if (!found) {
          setSortedBookings((sortedBookings) => [
            ...sortedBookings,
            bookings[i],
          ]);
        }
      }
    }
  }

  useEffect(() => {
    for (let i = 0; i < sortedBookings.length; i++) {
      const booking = sortedBookings[i];
      if (booking.time === 18) {
        setEarlyBooking((earlyBooking) => [...earlyBooking, booking]);
      }
      if (booking.time === 21) {
        setLateBooking((lateBooking) => [...lateBooking, booking]);
      }
    }
  }, [sortedBookings]);

  const earlyBookings = earlyBooking.map((booking) => {
    return (
      <>
        <div key={booking._id} className="admin__bookings__early">
          <p className="admin__bookings--info">
            <b className="admin__bookings--info--heading">Name </b>{" "}
            {booking.customer.name}
          </p>
          <p className="admin__bookings--info">
            <b className="admin__bookings--info--heading">Party </b>
            {booking.guests}
          </p>
          <p className="admin__bookings--info">
            <b className="admin__bookings--info--heading">Phone </b>
            {booking.customer.phone}
          </p>
          <p className="admin__bookings--info">
            <b className="admin__bookings--info--heading">Email </b>
            {booking.customer.email}
          </p>
          <Link to={"/edit-booking/" + booking._id}>
            {" "}
            <i className="admin__bookings__icon fa-solid fa-pen"></i>
          </Link>
        </div>
      </>
    );
  });

  const lateBookings = lateBooking.map((booking) => {
    return (
      <>
        <div key={booking._id} className="admin__bookings__late">
          <p className="admin__bookings--info">
            <b className="admin__bookings--info--heading">Name </b>{" "}
            {booking.customer.name}
          </p>
          <p className="admin__bookings--info">
            <b className="admin__bookings--info--heading">Party </b>
            {booking.guests}
          </p>
          <p className="admin__bookings--info">
            <b className="admin__bookings--info--heading">Phone </b>
            {booking.customer.phone}
          </p>
          <p className="admin__bookings--info">
            <b className="admin__bookings--info--heading">Email </b>
            {booking.customer.email}
          </p>
          <Link to={"/edit-booking/" + booking._id}>
            <i className="admin__bookings__icon fa-solid fa-pen"></i>
          </Link>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="admin">
        <div className="admin__search">
          <input
            className="admin__search__date-input"
            type="date"
            defaultValue={date}
            onChange={changeDate}
          ></input>
          <button
            onClick={() => {
              setSortedBookings([]);
              findBooking(date);
            }}
            className="admin__search__input-button"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div className="admin__bookings">
          <p className="admin__bookings--date">
            {new Date(date).toDateString()}
          </p>
          <h2 className="admin__bookings--heading">Early sitting</h2>

          {earlyBookings}
          <h2 className="admin__bookings--heading">Late sitting</h2>

          {lateBookings}
        </div>
      </div>
    </>
  );
}
