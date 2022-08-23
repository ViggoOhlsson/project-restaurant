import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IBooking } from "../../models/IBooking";

// return <p>{params.get("userId")}</p>;

export function AdminEdit() {
  //   const [editBookingObject, setEditBookingObject] = useState({});

  const [params, setParams] = useState(useParams());

  const [id, setId] = useState(params.id);

  const [bookings, setBookings] = useState<IBooking[]>([]);

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

  const [editing, setEditing] = useState<IBooking>({
    date: new Date(),
    time: 0,
    guests: 0,
    _id: "",
    customer: {
      _id: "",
      name: "",
      email: "",
      phone: 0,
    },
  });

  const [deleteBookingId, setDeleteBookingId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/getallbookings").then((res) => {
      console.log(res);
      setBookings(res.data);
      for (let i = 0; i < bookings.length; i++) {
        if (bookings[i]._id === id) setEditing(bookings[i]);
      }
    });
  }, []);

  useEffect(() => {
    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i]._id === id) setEditing(bookings[i]);
    }
  }, [bookings]);

  //Anropar api och skickar ett objekt till en post som redigerar bokning
  useEffect(() => {
    if (booking.time === 0) return;
    let bookingObject = JSON.stringify(booking);
    axios
      .post("http://localhost:8000/admineditbooking/" + bookingObject)
      .then((res) => {
        console.log(res);
      });
    setBooking({
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
  }, [booking]);

  //Anropar api och skickar ett id till en post som raderar bokning
  useEffect(() => {
    if (deleteBookingId === "") return;
    axios
      .post("http://localhost:8000/admindeletebooking/" + deleteBookingId)
      .then((res) => {
        console.log(res);
      });
    setDeleteBookingId("");
  }, [deleteBookingId]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.type === "number") {
      setEditing({ ...editing, [e.target.name]: +e.target.value });
    } else {
      setEditing({ ...editing, [e.target.name]: e.target.value });
    }
  }

  function handleSave(e: FormEvent) {
    e.preventDefault();

    setBooking(editing);

    setEditing({
      date: new Date(),
      time: 0,
      guests: 0,
      _id: "",
      customer: {
        _id: "",
        name: "",
        email: "",
        phone: 0,
      },
    });
  }

  function deleteBooking(id: string) {
    setDeleteBookingId(id);
  }

  return (
    <>
      <form onSubmit={handleSave}>
        <input
          type="date"
          name="date"
          defaultValue={new Date(editing.date).toLocaleDateString()}
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
        <Link to={"/admin"}>Cancel</Link>
        <button>Update reservation</button>
      </form>
      <button
        onClick={() => {
          deleteBooking(editing._id);
        }}
      >
        Remove reservation
      </button>
    </>
  );
}
