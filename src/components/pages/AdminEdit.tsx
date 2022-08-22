import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IBooking } from "../../models/IBooking";

// return <p>{params.get("userId")}</p>;

export function AdminEdit() {
  //   const [editBookingObject, setEditBookingObject] = useState({});

  const [id, setId] = useState(
    new URLSearchParams(window.location.pathname).get("_id")
  );

  const [bookings, setBookings] = useState<IBooking[]>([]);

  const [booking, setBooking] = useState<IBooking>({
    date: new Date(),
    time: 0,
    guests: 0,
    customer: "",
    _id: "",
  });

  const [editing, setEditing] = useState({
    date: new Date(),
    time: 0,
    guests: 0,
    _id: "",
    customer: "",
  });

  useEffect(() => {
    axios.get("http://localhost:8000/getallbookings").then((res) => {
      console.log(res);
      setBookings(res.data);
    });
  }, []);

  //Anropar api och skickar ett objekt till en post som redigerar bokning
  useEffect(() => {
    axios
      .post("http://localhost:8000/admineditbooking/" + booking)
      .then((res) => {
        console.log(res);
      });
  }, [booking]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.type === "number") {
      setEditing({ ...editing, [e.target.name]: +e.target.value });
    } else {
      setEditing({ ...editing, [e.target.name]: e.target.value });
    }
  }

  function handleSave(e: FormEvent) {
    e.preventDefault();

    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i]._id === id) {
        setEditing({
          ...editing,
          [bookings[i]._id]: id,
          [bookings[i].customer]: bookings[i]._id,
        });
      }
    }

    setBooking(editing);

    setEditing({
      date: new Date(),
      time: 0,
      guests: 0,
      _id: "",
      customer: "",
    });
  }
  return (
    <>
      <form onSubmit={handleSave}>
        <input
          type="date"
          name="date"
          value={editing.date.toISOString()}
          onChange={handleChange}
          placeholder="Date"
        />
        <input
          type="text"
          name="guests"
          value={editing.guests}
          onChange={handleChange}
          placeholder="Guests"
        />
        <input
          type="number"
          name="time"
          value={editing.time}
          onChange={handleChange}
          placeholder="Time"
        />
        <button>Skapa ny film</button>
      </form>
    </>
  );
}
