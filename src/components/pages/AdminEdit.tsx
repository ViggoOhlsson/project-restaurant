import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IBooking, ICustomer } from "../../models/IBooking";

export function AdminEdit() {
  const [id, setId] = useState(useParams().id);

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

  // const [customer, setCustomer] = useState<ICustomer>({
  //   _id: "",
  //   name: "",
  //   email: "",
  //   phone: 0,
  // });

  // const [editCustomer, setEditCustomer] = useState<ICustomer>({
  //   _id: "",
  //   name: "",
  //   email: "",
  //   phone: 0,
  // });

  const [deleteBookingId, setDeleteBookingId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/getallbookings").then((res) => {
      console.log(res);
      setBookings(res.data);
      for (let i = 0; i < bookings.length; i++) {
        if (bookings[i]._id === id) {
          setEditing(bookings[i]);
          // setEditCustomer(bookings[i].customer);
        }
      }
    });
  }, []);

  useEffect(() => {
    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i]._id === id) {
        setEditing(bookings[i]);
        // setEditCustomer(bookings[i].customer);
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
        setFullyBooked(res.data);
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

    // setFullyBooked(true);
  }, [booking]);

  //Anropar api och skickar ett objekt till en post som redigerar customer
  // useEffect(() => {
  //   if (customer.name === "") return;
  //   let customerObject = JSON.stringify(customer);
  //   axios
  //     .post("http://localhost:8000/admineditcustomer/" + customerObject)
  //     .then((res) => {
  //       console.log(res);
  //     });
  //   setCustomer({
  //       _id: "",
  //       name: "",
  //       email: "",
  //       phone: 0,
  //   });
  // }, [customer]);

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

  function handleInfoChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.type === "number") {
      setEditing({ ...editing, [e.target.name]: +e.target.value });
    } else {
      setEditing({ ...editing, [e.target.name]: e.target.value });
    }
  }

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
      <div className="admin-edit">
        <h3 className="admin-edit__section admin-edit__section--heading">
          Edit reservation
        </h3>
        <form
          className="admin-edit__section admin-edit__section--form"
          onSubmit={handleSave}
        >
          {fullyBooked && <span className="form__error">Not enough available tables!</span>}

          <div className="form__info">
            <div className="form__date">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]} //Tar bort passerade datum
                name="date"
                value={new Date(editing.date).toLocaleDateString()}
                onChange={handleInfoChange}
                placeholder="Date"
              />
            </div>
            <div className="form__time">
              <label htmlFor="time">Time</label>
              <input
                type="number"
                name="time"
                step="3"
                min="18"
                max="21"
                value={editing.time}
                onChange={handleInfoChange}
                placeholder="Time"
              />
            </div>
            <div className="form__guests">
              <label htmlFor="guests">Guests</label>
              <input
                type="number"
                name="guests"
                min="1"
                max="90"
                value={editing.guests}
                onChange={handleInfoChange}
                placeholder="Guests"
              />
            </div>
          </div>
          <div className="form__user">
            <div className="form__userName">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={editing.customer.name}
                onChange={handleUserChange}
              />
            </div>
            <div className="form__email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={editing.customer.email}
                onChange={handleUserChange}
              />
            </div>
            <div className="form__phone">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                value={editing.customer.phone}
                onChange={handleUserChange}
              />
            </div>
          </div>
          <div className="form__buttons">
            <Link className="form__cancel" to={"/admin"}>
              Cancel
            </Link>
            <button className="form__update">Update reservation</button>
          </div>
        </form>
        <button
          className="admin-edit__section admin-edit__section--delete"
          onClick={() => {
            deleteBooking(editing._id);
          }}
        >
          Remove reservation x
        </button>
      </div>
    </main>
  );
}
