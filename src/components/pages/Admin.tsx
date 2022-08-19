import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IBooking } from "../../models/IBooking";

export function Admin() {
  const [bookings, setBookings] = useState<IBooking[]>([]);

  const [sortedBookings, setSortedBookings] = useState<IBooking[]>([]);

  const [deleteBookingId, setDeleteBookingId] = useState("");

  const [editBookingObject, setEditBookingObject] = useState({});

  const [editing, setEditing] = useState({
    date: new Date(),
    time: 0,
    guests: 0,
  });

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
      .post("http://localhost:8000/admindeletebookingid/" + deleteBookingId)
      .then((res) => {
        console.log(res);
      });
  }, [deleteBookingId]);

  //Anropar api och skickar ett objekt till en post som redigerar bokning
  useEffect(() => {
    axios
      .post("http://localhost:8000/admineditbookingobject/" + editBookingObject)
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

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.type === "number") {
      setEditing({ ...editing, [e.target.name]: +e.target.value });
    } else {
      setEditing({ ...editing, [e.target.name]: e.target.value });
    }
  }

  function handleSave(e: FormEvent) {
    e.preventDefault();

    setEditing({
      date: new Date(),
      time: 0,
      guests: 0,
    });
  }

  return (
    <>
      {/* <form onSubmit={handleSave}>

<input type="date" name="date" value={booking.date} onChange={handleChange} placeholder="Date"/>
<input type="text" name="guests" value={booking.guests} onChange={handleChange} placeholder="Guests"/>
<input type="number" name="time" value={booking.time} onChange={handleChange} placeholder="Time"/>
<button>Skapa ny film</button>
</form> */}
    </>
  );
}
