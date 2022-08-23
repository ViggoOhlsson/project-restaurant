import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBooking } from "../../models/IBooking";

export function Admin() {
  const [bookings, setBookings] = useState<IBooking[]>([]);

  const [sortedBookings, setSortedBookings] = useState<IBooking[]>([]);

  const [date, setDate] = useState("");

  //Anropar api och hämtar alla bokningar
  useEffect(() => {
    axios.get("http://localhost:8000/getallbookings").then((res) => {
      console.log(res);
      setBookings(res.data);
    });
  }, []);

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  function changeDate(e: ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value);
  }

  function findBooking(findDate: string) {
    let newDate = new Date(findDate);
    for (let i = 0; i < bookings.length; i++) {
      let found = false;
      if (bookings[i].date.toString() === newDate.toISOString()) {
        for (let i = 0; i < sortedBookings.length; i++) {
          if (sortedBookings[i]._id === bookings[i]._id) {
            found = true;
          }
        }
        if (!found) {
          setSortedBookings((sortedBookings) => [
            ...sortedBookings,
            bookings[i],
          ]);
        }
      }
    }
  }

  const displayBookings = sortedBookings.map((booking) => {
    console.log(sortedBookings);
    return (
      <div key={booking._id} className="booking-container">
        <p>{booking.guests}</p>
        <p>{booking.time}</p>
        {/* <p>{booking.customer.}</p> */}
        <Link to={"/edit-booking/" + booking._id}>Redigera</Link>
      </div>
    );
  });

  return (
    <>
      <input type="date" defaultValue={date} onChange={changeDate}></input>
      <button
        onClick={() => {
          findBooking(date);
        }}
      >
        Sök bokningar
      </button>

      {displayBookings}

      {/* 
<p>Booking View</p>
    <div>
        <p>Date</p>
        <input type="date" defaultValue={date} onChange={changeDate}></input>
        <p>Time</p>
        <select name="time" onChange={changeTime}>
            <option disabled>Select a time</option>
            <option value="18">18:00 to 20:59</option>
            <option value="21">21:00 to 23:59</option>
        </select>
        <p>Guests</p>
        <input type="number" value={guests} onChange={changeGuests}></input>
    </div>
    <div>
        <p>Name</p>
        <input type="text" placeholder="Full Name" onChange={changeName}></input>
        <p>Email</p>
        <input type="email" placeholder="example@domain.com" onChange={changeEmail}></input>
        <p>Phone</p>
        <input type="tel" placeholder="111-222 33 44" onChange={changePhone}></input>
    </div>
    <br></br>
    <button onClick={placeBooking}>Place Booking</button>  
    <h2>{`${time} O' Clock - ${date} - ${guests} Guests`}</h2>
    <h2>{`${name} - ${email} - ${phone} `}</h2> */}
    </>
  );
}

// const changeTime = (e: ChangeEvent<HTMLSelectElement>) => {
//     console.log("Time:", e.target.value)
//     setTime(parseInt(e.target.value))
// }
// const changeDate = (e: ChangeEvent<HTMLInputElement>) => {
//     console.log("Date:", e.target.value)
//     setDate(e.target.value)
// }
// const changeGuests = (e:ChangeEvent<HTMLInputElement>) => {
//     let guests = parseInt(e.target.value)
//     if (guests < 1) guests = 1
//     if (guests > 6) guests = 6
//     setGuests(guests)
//     console.log(guests)
// }
// const changeName = (e:ChangeEvent<HTMLInputElement>) => setName(e.target.value)
// const changeEmail = (e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
// const changePhone = (e:ChangeEvent<HTMLInputElement>) => setPhone(parseInt(e.target.value))

// const placeBooking = async () => {
//     let body = {time, date, guests, name, email, phone, gamer: "wowzers"}
//     console.log(body)
//     let res = await axios.post("http://localhost:8000/book", body)
//     console.log(res)
// }

// useEffect(() => {
//     setDate(new Date().toLocaleDateString())
// }, [])
