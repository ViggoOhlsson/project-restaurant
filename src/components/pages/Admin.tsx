import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBooking } from "../../models/IBooking";

export function Admin() {
  const [bookings, setBookings] = useState<IBooking[]>([]);

  const [sortedBookings, setSortedBookings] = useState<IBooking[]>([]);

  const [deleteBookingId, setDeleteBookingId] = useState("");

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(18);
  const [guests, setGuests] = useState(1);

  //Anropar api och hämtar alla bokningar
  useEffect(() => {
    axios.get("http://localhost:8000/getallbookings").then((res) => {
      console.log(res);
      setBookings(res.data);
    });
  }, []);

  //Anropar api och skickar ett id till en post som raderar bokning
  useEffect(() => {
    axios
      .post("http://localhost:8000/admindeletebookingid/" + deleteBookingId)
      .then((res) => {
        console.log(res);
      });
  }, [deleteBookingId]);

  function deleteBooking(id: string) {
    setDeleteBookingId(id);
  }

  function findBooking(findDate: Date) {
    console.log(sortedBookings);
    for (let i = 0; i < bookings.length; i++) {
      console.log(bookings[i].date);
      console.log(findDate.toISOString());

      if (bookings[i].date === findDate) {
        setSortedBookings([...sortedBookings, bookings[i]]);
        console.log(sortedBookings);
      }
    }
  }

  const displayBookings = sortedBookings.map((booking) => {
    return (
      <div key={booking._id} className="booking-container">
        <p>{booking.guests}</p>
        <p>{booking.time}</p>
        <Link to={"/edit-booking/" + booking._id}>Redigera</Link>
      </div>
    );
  });

  return (
    <>
      <input
        type="date"
        defaultValue={date.toLocaleDateString()}
        onChange={() => {
          findBooking(date);
        }}
      ></input>

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
