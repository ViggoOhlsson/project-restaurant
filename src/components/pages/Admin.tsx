import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBooking } from "../../models/IBooking";
import { ShowBookings } from "../adminComponents/ShowBookings";
import { Loader } from "../Loader";

const linkStyle = {
  color: "#d8d8d8",
  textDecoration: "none",
};

export function Admin() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [sortedBookings, setSortedBookings] = useState<IBooking[]>([]);
  const [earlyBooking, setEarlyBooking] = useState<IBooking[]>([]);
  const [lateBooking, setLateBooking] = useState<IBooking[]>([]);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  //Anropar api och hämtar alla bokningar
  useEffect(() => {
    axios.get("http://localhost:8000/getallbookings").then((res) => {
      setBookings(res.data);
    });
  }, []);

  //Hittar bokningar för dagens datum och körs då useState booking ändras
  useEffect(() => {
    findBooking(date.slice(0, 10));
  }, [bookings]);

  //Låter admin välja ett date
  function changeDate(e: ChangeEvent<HTMLInputElement>) {
    setSortedBookings([]);
    setDate(e.target.value);
    findBooking(e.target.value);
  }

  function findBooking(date: string) {
    let foundBookings: IBooking[] = [];

    for (let i = 0; i < bookings.length; i++) {
      let found = false;
      if (bookings[i].date.toString().slice(0, 10) === date) {
        for (let j = 0; j < foundBookings.length; j++) {
          if (foundBookings[j]._id === bookings[i]._id) {
            found = true;
          }
        }

        if (!found) {
          foundBookings.push(bookings[i]);
        }
      }
    }
    setSortedBookings(foundBookings);
  }

  //Delar upp bokningarna efter tid
  useEffect(() => {
    setEarlyBooking([]);
    setLateBooking([]);

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

  //Går igenom bokningarna med tiden 18 och skapar html
  const earlyBookings = earlyBooking.map((booking) => {
    return <ShowBookings key={booking._id} booking={booking}></ShowBookings>;
  });

  //Går igenom bokningarna med tiden 21 och skapar html
  const lateBookings = lateBooking.map((booking) => {
    return <ShowBookings key={booking._id} booking={booking}></ShowBookings>;
  });

  return (
    <>
      <div className="admin">
        <div className="admin__search">
          <div className="admin__search--field">
            <input
              className="admin__search--field__date-input"
              type="date"
              defaultValue={date}
              onChange={changeDate}
            ></input>
          </div>
          <div className="buttons">
            <Link to={"/admin/add-new"} style={linkStyle}>
              <i className="fa-solid fa-calendar-plus"></i>
            </Link>
          </div>
        </div>

        <div className="admin__bookings">
          {loader ? (
            <Loader></Loader>
          ) : (
            <>
              <p className="admin__bookings--date">
                {new Date(date).toDateString()}
              </p>
              <h2 className="admin__bookings--heading">Early sitting</h2>

              {earlyBooking.length > 0 ? (
                earlyBookings
              ) : (
                <p className="admin__bookings__empty">No reservations</p>
              )}
              <h2 className="admin__bookings--heading">Late sitting</h2>

              {lateBooking.length > 0 ? (
                lateBookings
              ) : (
                <p className="admin__bookings__empty">No reservations</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
