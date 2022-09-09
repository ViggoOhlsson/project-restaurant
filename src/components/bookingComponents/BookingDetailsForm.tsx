import axios from "axios";
import {
  ChangeEvent,
  EventHandler,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";
import { IBookingDetails } from "../../models/IBookingDetails";
import { BookingDatePicker } from "./BookingDatePicker";
import Calendar from "react-calendar";
import ht from "date-fns/locale/ht";

interface IBookingDetailsFormProps {
  date: Date;
  time: number;
  guests: number;
  changeTime: (time: number) => void;
  changeGuests: (guests: number) => void;
  changeDate: (date: Date) => void;
  changePhase: (phase: number) => void;
}

export const BookingDetailsForm = (props: IBookingDetailsFormProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState(18);
  const [guests, setGuests] = useState(1);
  const [fullyBooked, setFullyBooked] = useState(false);

  const checkBooking = () => {};
  useEffect(() => {
    console.log("checking booking");
    axios
      .post("http://localhost:8000/validate/dateandtime", {
        date: date.toLocaleDateString(),
        time,
        guests,
      })
      .then((result) => {
        setFullyBooked(result.data.fullyBooked);
        console.log(fullyBooked);
      });
  }, [time, date, guests]);

  const handleGuests = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("called!");
    let val = parseInt(e.target.value) || 1;
    if (val > 90) val = 90;
    setGuests(val);
    props.changeGuests(val);
    checkBooking();
  };
  const handleTime = (time: number) => {
    setTime(time);
    props.changeTime(time);
    checkBooking();
  };

  useEffect(() => {
    console.log(date);
    props.changeDate(new Date(date));
    checkBooking();
  }, [date]);

  const next = () => {
    if (!fullyBooked) props.changePhase(2);
  };

  return (
    <>
      <div className="phase-container date-phase">
        <div className="date-container">
          {/* <p>{props.date.toString()}</p> */}
          <Calendar
            onChange={setDate}
            value={new Date(props.date.toLocaleDateString())}
          />
          {/* <input type="date" min={new Date().toISOString().split("T")[0]} defaultValue={new Date().toLocaleDateString()} onChange={changeDate}></input> */}
        </div>
        <div className="time-container">
          <span className="title">Time</span>
          <div className="choice-wrapper">
            <span
              className={`${props.time === 18 && "selected"}`}
              onClick={() => handleTime(18)}
            >
              18 - 20
            </span>
            <span
              className={`${props.time === 21 && "selected"}`}
              onClick={() => handleTime(21)}
            >
              21 - 23
            </span>
          </div>
        </div>
        <div className="guests-container">
          <span>Guests</span>
          <input type="number" onChange={handleGuests} value={props.guests} />
        </div>
        {(fullyBooked && (
          <p className="available available-false">
            There are no available tables
          </p>
        )) || <p className="available">There are available tables</p>}
      </div>
      <div className="change-phase-wrapper">
        <div className="navigator" onClick={next}>
          Continue <i className="fa-solid fa-angle-right"></i>
        </div>
      </div>
    </>
  );
};
