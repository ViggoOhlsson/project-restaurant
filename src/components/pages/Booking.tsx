import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingPhase } from "../BookingPhase";
// import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

export function Booking() {
  document.title = "Booking";
  const navigate = useNavigate();

  const [phase, setPhase] = useState(1);

  const [time, setTime] = useState(18);
  const [date, setDate] = useState(new Date());
  // const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);

  const changeTime = (t: number) => {
    console.log("Time:", t);
    setTime(t);
  };
  // const changeDate = () => {
  //   console.log("Date:", date);
  //   setDate(date);
  // };
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

  const placeBooking = async () => {
    let body = { time, date, guests, name, email, phone };
    console.log(body);
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
    } finally {
      changePhase(4);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  const changePhase = (to: number) => {
    if (to < 1) to = 1;
    if (to > 4) to = 4;
    console.log("changed phase to:", to);
    setPhase(to);
  };

  // useEffect(() => {
  //   setDate(new Date().toLocaleDateString());
  // }, []);

  return (
    <>
      <main className="booking-page">
        <BookingPhase phase={phase} changePhase={changePhase}></BookingPhase>
        <div className="form-container">
          {phase === 1 && (
            <div className="phase-container date-phase">
              <div className="date-container">
                {/* <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  defaultValue={date}
                  onChange={changeDate}
                ></input> */}
                {/* <BookingDatePicker
                  changeDate={() => {
                    changeDate(date);
                  }}
                ></BookingDatePicker> */}
                <div className="app">
                  <div className="calendar-container">
                    <Calendar onChange={setDate} value={date} />
                  </div>
                  {/* <div className="text-center">Selected date: {date}</div> */}
                </div>
              </div>

              <div className="time-container">
                <span className="title">Time</span>

                <div className="choice-wrapper">
                  <span
                    className={`${time === 18 && "selected"}`}
                    onClick={() => changeTime(18)}
                  >
                    18 - 20
                  </span>
                  <span
                    className={`${time === 21 && "selected"}`}
                    onClick={() => changeTime(21)}
                  >
                    21 - 23
                  </span>
                </div>
              </div>
            </div>
          )}
          {phase === 2 && (
            <div className="phase-container info-phase">
              <div className="info-container">
                <div>
                  <p>What name do you want to book in?</p>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={changeName}
                  ></input>
                </div>
                <div>
                  <p>Where do you want to get the confirmation?</p>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={changeEmail}
                  ></input>
                </div>
                <div>
                  <p>How can we contact you?</p>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    onChange={changePhone}
                  ></input>
                </div>
                <div>
                  <p>How big is your party?</p>
                  <input
                    type="number"
                    className="guests-input"
                    onChange={changeGuests}
                    value={guests}
                  ></input>
                </div>
              </div>
            </div>
          )}
          {phase === 3 && (
            <div className="phase-container review-phase">
              <div className="booking-info-container">
                <div className="date">
                  <span>Date</span>
                  {/* <p>{date.toString().split("-").splice(1, 2).join("-")}</p> */}
                  <p>{date.toLocaleDateString()}</p>
                </div>
                <div className="guests">
                  <span>Guests</span>
                  <p>{guests}</p>
                </div>
                <div className="time">
                  <span>Time</span>
                  <p>
                    {time} - {time + 2}
                  </p>
                </div>
              </div>
              <div className="customer-info-container">
                <p>Contact Information</p>
                <div>
                  <p>{name}</p>
                  <p>{email}</p>
                  <p>{phone}</p>
                </div>
              </div>
              <button onClick={placeBooking} className="submit-button">
                <i className="fa-solid fa-check"></i>
                <span>Place Booking</span>
              </button>
            </div>
          )}
          {phase === 4 && (
            <div className="phase-container redirect-phase">
              <i className="fa-solid fa-check"></i>
              <h2>Reservation Complete!</h2>
            </div>
          )}
        </div>
        {phase < 3 && (
          <div className="next-phase-wrapper">
            <span onClick={() => changePhase(phase + 1)}>Continue</span>
            <span>
              <i className="fa-solid fa-angle-right"></i>
            </span>
          </div>
        )}
      </main>
    </>
  );
}
