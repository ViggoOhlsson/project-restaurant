import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IBookingDetails } from "../../models/IBookingDetails";
import { IBookingGuestInfo } from "../../models/IBookingGuestInfo";
import { BookingDetailsform } from "../BookingDetailsForm";
import { BookingGuestInfoForm } from "../BookingGuestInfoForm";
import { BookingPhase } from "../BookingPhase";
import { BookingReview } from "../BookingReview";

export function Booking() {
  document.title = "Booking";
  const navigate = useNavigate()

  const [phase, setPhase] = useState(1);

  const [booking, setBooking] = useState({
    
  })

  const [bookingDetails, setBookingDetails] = useState<IBookingDetails>({
    date: "",
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

  const [time, setTime] = useState(18);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const placeBooking = async () => {
    let body = { time, date, guests, name, email, phone };
    console.log(body);
    try {
      let res = await axios.post("http://localhost:8000/book", body);
      let emailRes = await axios.post("http://localhost:8000/send-email",res.data);
      console.log("booking sent:", res);
      console.log(emailRes);
    } catch (err) {
      console.log(err);
    } finally {
      changePhase(4);
      setTimeout(() => {
        navigate("/")
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
    setDate(new Date().toLocaleDateString());
  }, []);

  return (
    <main className="booking-page">
      <BookingPhase phase={phase} changePhase={changePhase}></BookingPhase>
      <div className="form-container">
        {phase === 1 && ( <BookingDetailsform changeBookingDetails={changeBookingDetails} /> )}
        {phase === 2 && ( <BookingGuestInfoForm changeBookingGuestInfo={changeBookingGuestInfo} />)}
        {phase === 3 && ( <BookingReview booking={}/>)}
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
  );
}
