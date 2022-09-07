import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IBooking, IBookingPrimitive } from "../../models/IBooking";
import { IBookingDetails } from "../../models/IBookingDetails";
import { IBookingGuestInfo } from "../../models/IBookingGuestInfo";
import { BookingDetailsForm } from "../bookingComponents/BookingDetailsForm";
import { BookingGuestInfoForm } from "../bookingComponents/BookingGuestInfoForm";
import { BookingPhase } from "../bookingComponents/BookingPhase";
import { BookingReview } from "../bookingComponents/BookingReview";

export function Booking() {
  document.title = "Booking";
  const navigate = useNavigate();

  const [phase, setPhase] = useState(1);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(18);
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);

  const changePhone = (phone: number) => {
    setPhone(phone);
  };
  const changeName = (name: string) => {
    setName(name);
  };
  const changeEmail = (email: string) => {
    setEmail(email);
  };
  const changeDate = (date: Date) => {
    setDate(date);
  };
  const changeTime = (time: number) => {
    setTime(time);
  };
  const changeGuests = (guests: number) => {
    console.log("changing guests");
    setGuests(guests);
  };

  const placeBooking = async () => {
    let success = false;
    let body: IBookingPrimitive = {
      name: name,
      email: email,
      phone: phone,
      guests: guests,
      date: date.toLocaleDateString(),
      time: time,
    };
    console.log(body);
    try {
      console.log("trying...");
      let res = await axios.post("http://localhost:8000/book", body);
      // let emailRes = await axios.post("http://localhost:8000/send-email", res.data);
      console.log("booking sent:", res);
      // console.log(emailRes);
      success = true;
    } catch (err) {
      console.log(err);
    }
    if (success) {
      console.log("changing phase");
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

  return (
    <main className="booking-page">
      <BookingPhase phase={phase} changePhase={changePhase}></BookingPhase>
      <div className="form-container">
        {phase === 1 && (
          <BookingDetailsForm
            changePhase={changePhase}
            time={time}
            date={date}
            guests={guests}
            changeTime={changeTime}
            changeDate={changeDate}
            changeGuests={changeGuests}
          />
        )}
        {phase === 2 && (
          <BookingGuestInfoForm
            email={email}
            name={name}
            phone={phone}
            changeEmail={changeEmail}
            changePhone={changePhone}
            changeName={changeName}
            changePhase={changePhase}
          />
        )}
        {phase === 3 && (
          <BookingReview
            placeBooking={placeBooking}
            booking={{
              time: time,
              date: date.toLocaleDateString(),
              name: name,
              email: email,
              phone: phone,
              guests: guests,
            }}
            changePhase={changePhase}
          />
        )}
        {phase === 4 && (
          <div className="phase-container redirect-phase">
            <i className="fa-solid fa-check"></i>
            <h2>Reservation Complete!</h2>
            <span>You will soon be redirected...</span>
          </div>
        )}
      </div>
    </main>
  );
}
