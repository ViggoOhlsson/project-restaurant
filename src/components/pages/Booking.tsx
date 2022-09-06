import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IBooking, IBookingPrimitive } from "../../models/IBooking";
import { IBookingDetails } from "../../models/IBookingDetails";
import { IBookingGuestInfo } from "../../models/IBookingGuestInfo";
import { BookingDetailsForm } from "../BookingDetailsForm";
import { BookingGuestInfoForm } from "../BookingGuestInfoForm";
import { BookingPhase } from "../BookingPhase";
import { BookingReview } from "../BookingReview";

export function Booking() {
  document.title = "Booking";
  const navigate = useNavigate();

  const [phase, setPhase] = useState(1);

  const [booking, setBooking] = useState<IBookingPrimitive>({
    name: "",
    email: "",
    phone: 0,
    time: 18,
    guests: 0,
    date: ""
  })

  const [bookingDetails, setBookingDetails] = useState<IBookingDetails>({
    date: new Date().toLocaleDateString(),
    time: 18,
    guests: 1
  })

  const [bookingGuestInfo, setBookingGuestInfo] = useState<IBookingGuestInfo>({
    name: "",
    email: "",
    phone: 1112223344
  })

  const changeBookingDetails = (bookingDetails: IBookingDetails) => {
    setBookingDetails(bookingDetails)
  }
  const changeBookingGuestInfo = (bookingGuestInfo: IBookingGuestInfo) => {
    setBookingGuestInfo(bookingGuestInfo)
  }

  const placeBooking = async () => {
    let success = false
    let body = { 
      time: bookingDetails.time,
      date: bookingDetails.date,
      guests: bookingDetails.guests,
      name: bookingGuestInfo.name,
      email: bookingGuestInfo.email,
      phone: bookingGuestInfo.phone
    };
    console.log(body);
    try {
      console.log("trying...")
      let res = await axios.post("http://localhost:8000/book", body);
      // let emailRes = await axios.post("http://localhost:8000/send-email", res.data);
      console.log("booking sent:", res);
      // console.log(emailRes);
      success = true

    } catch (err) {
      console.log(err);
    } 
    if (success) {
      console.log("changing phase")
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

  useEffect(() => {
    let booking = {
      date: bookingDetails.date,
      time: bookingDetails.time,
      guests: bookingDetails.guests,
      name: bookingGuestInfo.name,
      email: bookingGuestInfo.email,
      phone: bookingGuestInfo.phone
    }
    setBooking(booking)
  }, [bookingDetails, bookingGuestInfo])

  return (
    <main className="booking-page">
      <BookingPhase phase={phase} changePhase={changePhase}></BookingPhase>
      <div className="form-container">
        {phase === 1 && ( <BookingDetailsForm changeBookingDetails={changeBookingDetails} /> )}
        {phase === 2 && ( <BookingGuestInfoForm changeBookingGuestInfo={changeBookingGuestInfo} />)}
        {phase === 3 && ( <BookingReview booking={booking} placeBooking={placeBooking}/>)}
        {phase === 4 && ( <div className="phase-container redirect-phase">
            <i className="fa-solid fa-check"></i>
            <h2>Reservation Complete!</h2>
            <span>You will soon be redirected...</span>
          </div> )}
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
  );
}
