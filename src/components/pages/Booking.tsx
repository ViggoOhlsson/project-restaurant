import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"

export function Booking() {

    const [time, setTime] = useState(18)
    const [date, setDate] = useState("")
    const [guests, setGuests] = useState(1)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState(0)

    const changeTime = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log("Time:", e.target.value)
        setTime(parseInt(e.target.value))
    }
    const changeDate = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("Date:", e.target.value)
        setDate(e.target.value)
    }
    const changeGuests = (e:ChangeEvent<HTMLInputElement>) => {
        let guests = parseInt(e.target.value || "0")
        if (guests < 0) guests = 0
        if (guests > 90) guests = 90
        setGuests(guests)
        console.log(guests)
    }
    const changeName = (e:ChangeEvent<HTMLInputElement>) => setName(e.target.value)
    const changeEmail = (e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const changePhone = (e:ChangeEvent<HTMLInputElement>) => setPhone(parseInt(e.target.value))

    const placeBooking = async () => {
        let body = {time, date, guests, name, email, phone}
        console.log(body)
        try {
            let res = await axios.post("http://localhost:8000/book", body)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setDate(new Date().toLocaleDateString())
    }, [])
    

    return <main className="booking-page">
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
    </main>
}