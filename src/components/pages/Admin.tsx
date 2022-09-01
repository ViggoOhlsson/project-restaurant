import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBooking } from "../../models/IBooking";

export function Admin() {
  const [bookings, setBookings] = useState<IBooking[]>([]);

  const [sortedBookings, setSortedBookings] = useState<IBooking[]>([]);

  const [earlyBookings, setEarlyBookings] = useState<IBooking[]>([]);

  const [lateBookings, setLateBookings] = useState<IBooking[]>([]);

  const [date, setDate] = useState("");

  //Anropar api och hämtar alla bokningar
  useEffect(() => {
    axios.get("http://localhost:8000/getallbookings").then((res) => {
      console.log(res);
      setBookings(res.data);

    });
  }, []);

  useEffect(() => {
    setEarlyBookings(bookings.filter(b => b.time === 18))
    setLateBookings(bookings.filter(b => b.time === 21))
  }, [bookings])

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  //Låter admin välja ett date
  function changeDate(e: ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value);
  }

  //Tar emot date som admin valt och går igenom alla bokningar för att sortera ut de med rätt datum
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

  return (
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
        <div className="admin__bookings--table--container">
          <table className="admin__bookings--table">
            <tr className="admin__bookings--table--head">
              <th>Name</th>
              <th>Party</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
            {earlyBookings.map(booking => {
              return (
                <tr className="admin__bookings--table--row">
                  <td>{booking.customer.name}</td>
                  <td>{booking.guests}</td>
                  <td>{booking.customer.phone}</td>
                  <td>{booking.customer.email}</td>
                  <Link to={"/edit-booking/" + booking._id} className="edit-icon"><i className="fa-solid fa-pencil"></i></Link>
                </tr>
              )
            })}
          </table>
        </div>
        <h2 className="admin__bookings--heading">Late sitting</h2>
        <table className="admin__bookings--table">
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
          {lateBookings.map(booking => {
            return (
              <tr>
                <td>{booking.customer.name}</td>
                <td>{booking.guests}</td>
                <td>{booking.customer.phone}</td>
                <td>{booking.customer.email}</td>
              </tr>
            )
          })}
        </table>

      </div>
    </div>
  );
}
