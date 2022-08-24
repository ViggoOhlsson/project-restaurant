import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"
import { BookingPhase } from "../BookingPhase"

export function Booking() {

    document.title = "Booking"

    const [phase, setPhase] = useState(1)

    const [time, setTime] = useState(18)
    const [date, setDate] = useState("")
    const [guests, setGuests] = useState(1)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState(0)

    const changeTime = (t: number) => {
        console.log("Time:", t)
        setTime(t)
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

    const changePhase = (to: number) => {
        if (to < 1 ) to = 1 
        if (to > 4 ) to = 4
        console.log("changed phase to:", to)
        setPhase(to)
    }

    useEffect(() => {
        setDate(new Date().toLocaleDateString())
    }, [])
    

    return <main className="booking-page">
        <BookingPhase phase={phase} changePhase={changePhase}></BookingPhase>
        <div className="form-container">
            { phase === 1 &&
            <div className="phase-container date-phase">
                <div className="date-container">
                    <input type="date" defaultValue={date} onChange={changeDate}></input>
                </div>
                <div className="time-container">
                    <span className="title">Time</span>

                    <div className="choice-wrapper">
                        <span className={`${time === 18 && 'selected'}`} onClick={() => changeTime(18)}>18 - 20</span>
                        <span className={`${time === 21 && 'selected'}`} onClick={() => changeTime(21)}>21 - 23</span>
                    </div>
                </div>
            </div>}
            { phase === 2 && 
            <div className="phase-container">
                <p>Name</p>
                <input type="text" placeholder="Full Name" onChange={changeName}></input>
                <p>Email</p>
                <input type="email" placeholder="example@domain.com" onChange={changeEmail}></input>
                <p>Phone</p>
                <input type="tel" placeholder="111-222 33 44" onChange={changePhone}></input>
            </div>
            }
        </div>
        <div className="next-phase-wrapper">
            <span onClick={() => changePhase(phase + 1)}>Continue</span>
            <span><i className="fa-solid fa-angle-right"></i></span>
        </div>
    </main>
}