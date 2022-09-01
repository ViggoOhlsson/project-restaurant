import { useState } from "react";
import Calendar from "react-calendar";

interface IBookingDatePickerProps {
  changeDate(date: Date): void;
}

export const BookingDatePicker = (props: IBookingDatePickerProps) => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="app">
      <h1 className="header">React Calendar</h1>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
      </div>
      <div className="text-center">Selected date: {date.toDateString()}</div>
      <button
        onClick={() => {
          props.changeDate(date);
        }}
      >
        Confirm date
      </button>
    </div>
  );
};
