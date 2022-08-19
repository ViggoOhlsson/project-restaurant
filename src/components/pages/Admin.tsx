import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IBooking } from "../../models/IBooking";

export function Admin() {
  const [bookings, setBookings] = useState<IBooking[]>([]);

  const [sortedBookings, setSortedBookings] = useState<IBooking[]>([]);

  const [deleteBookingId, setDeleteBookingId] = useState("");

  const [editBookingObject, setEditBookingObject] = useState({});

  //Anropar api och hämtar alla bokningar
  useEffect(() => {
    axios.get("http://localhost:8000/getallbookings").then((res) => {
      console.log(res);
      setBookings(res.data);
    });
  }, []);

  //Anropar api och skickar ett id till en post som raderar bokning
  useEffect(() => {
    axios
      .get("http://localhost:8000/admindeletebookingid/" + deleteBookingId)
      .then((res) => {
        console.log(res);
      });
  }, [deleteBookingId]);

  //Anropar api och skickar ett objekt till en post som redigerar bokning
  useEffect(() => {
    axios
      .get("http://localhost:8000/admineditbookingobject/" + editBookingObject)
      .then((res) => {
        console.log(res);
      });
  }, [editBookingObject]);

  function deleteBooking(id: string) {
    setDeleteBookingId(id);
  }

  function findBooking(findDate: Date) {
    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i].date === findDate) {
        setSortedBookings([...sortedBookings, bookings[i]]);
      }
    }
  }

  const displayBookings = sortedBookings.map((booking) => {
    return (
      <div key={booking._id} className="booking-container">
        <p>{booking.guests}</p>
        <p>{booking.time}</p>
      </div>
    );
  });
  return <></>;
}
