import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IBooking, ICustomer } from "../../models/IBooking";
import { EditConfirmed } from "../EditConfirmed";
import { EditForm } from "../EditForm";

export function AdminEdit() {
  const [id, setId] = useState(useParams().id);

  const [bookingDone, setBookingDone] = useState(false);
  const [fullyBooked, setFullyBooked] = useState(false);

  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [booking, setBooking] = useState<IBooking>({
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

  //Söker igenom alla bokningar i databasen efter bokningen med rätt id
  useEffect(() => {
    axios.get("http://localhost:8000/getallbookings").then((res) => {
      setBookings(res.data);
      for (let i = 0; i < bookings.length; i++) {
        if (bookings[i]._id === id) {
          setEditing(bookings[i]);
        }
      }
    });
  }, []);

  useEffect(() => {
    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i]._id === id) {
        setEditing(bookings[i]);
      }
    }
  }, [bookings]);

  //Anropar api och skickar ett objekt till en post som redigerar bokning
  useEffect(() => {
    if (booking.time === 0) return;
    let bookingObject = JSON.stringify(booking);

    axios
      .post("http://localhost:8000/admineditbooking/" + bookingObject)
      .then((res) => {
        //res.data är en boolean som är true om det redan är fullbokat
        setFullyBooked(res.data);
        setBookingDone(!res.data);
      });
    //Vad gör nedanstående kod? Ifall url ändras?

    // setBooking({
    //   date: new Date(),
    //   time: 0,
    //   guests: 0,
    //   customer: {
    //     _id: "",
    //     name: "",
    //     email: "",
    //     phone: 0,
    //   },
    //   _id: "",
    // });
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

  //Uppdaterar setEditing med bokningsinformation
  function handleInfoChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.type === "number") {
      setEditing({ ...editing, [e.target.name]: +e.target.value });
    } else {
      setEditing({ ...editing, [e.target.name]: e.target.value });
    }
  }

  //Uppdaterar setEditing med kundinformation
  function handleUserChange(e: ChangeEvent<HTMLInputElement>) {
    setEditing({
      ...editing,
      customer: { ...editing.customer, [e.target.name]: e.target.value },
    });
  }

  function handleSave(e: FormEvent) {
    e.preventDefault();
    setBooking(editing);
  }

  function deleteBooking(id: string) {
    setDeleteBookingId(id);
  }

  return (
    <main>
      {bookingDone ? (
        <EditConfirmed booking={booking}></EditConfirmed>
      ) : (
        <EditForm
          deleteBooking={deleteBooking}
          handleSave={handleSave}
          changeUser={handleUserChange}
          changeInfo={handleInfoChange}
          editingBooking={editing}
          fullyBooked={fullyBooked}
        ></EditForm>
      )}
    </main>
  );
}
