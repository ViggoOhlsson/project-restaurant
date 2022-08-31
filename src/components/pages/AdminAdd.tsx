import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { IBooking } from "../../models/IBooking";

export function AdminAdd() {
  const [fullyBooked, setFullyBooked] = useState(false);
  const [time, setTime] = useState(18);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);

  const [editing, setEditing] = useState<IBooking>({
    date: new Date(date),
    time: time,
    guests: guests,
    _id: "",
    customer: {
      _id: "",
      name: name,
      email: email,
      phone: phone,
    },
  });

  const changeTime = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Time:", e.target.value);
    setTime(parseInt(e.target.value));
  };
  const changeDate = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Date:", e.target.value);
    setDate(e.target.value);
  };
  const changeGuests = (e: ChangeEvent<HTMLInputElement>) => {
    let guests = parseInt(e.target.value || "0");
    if (guests < 0) guests = 0;
    if (guests > 90) guests = 90;
    setGuests(guests);
    console.log(guests);
  };

  const changeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const changePhone = (e: ChangeEvent<HTMLInputElement>) =>
    setPhone(parseInt(e.target.value));

  async function addUser(e: FormEvent) {
    e.preventDefault();

    let body = { date, time, guests, name, email, phone };

    console.log("editing " + guests);
    try {
      let res = await axios.post("http://localhost:8000/book", body);
      let emailRes = await axios.post(
        "http://localhost:8000/send-email",
        res.data
      );
      console.log("booking sent:", res);
      console.log(emailRes);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="admin-edit admin-add">
        <h3 className="admin-edit__section admin-edit__section--heading">
          Create reservation
        </h3>
        <form
          className="admin-edit__section admin-edit__section--form"
          onSubmit={addUser}
        >
          {fullyBooked && (
            <span className="form__error">Not enough available tables!</span>
          )}

          <div className="form__info">
            <div className="form__date">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]} //Tar bort passerade datum
                name="date"
                defaultValue={new Date(date).toLocaleDateString()}
                onChange={changeDate}
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
                value={time}
                onChange={changeTime}
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
                value={guests}
                onChange={changeGuests}
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
                value={name}
                onChange={changeName}
              />
            </div>
            <div className="form__email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={changeEmail}
              />
            </div>
            <div className="form__phone">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={changePhone}
              />
            </div>
          </div>
          <div className="form__buttons">
            <Link className="form__cancel" to={"/admin"}>
              Cancel
            </Link>
            <button className="form__update">Create reservation</button>
          </div>
        </form>
      </div>
    </>
  );
}
