import axios from "axios"
import { ChangeEvent, EventHandler, ReactEventHandler, useEffect, useState } from "react"
import { IBookingDetails } from "../../models/IBookingDetails"
import { BookingDatePicker } from "./BookingDatePicker"
import Calendar from "react-calendar"
import ht from "date-fns/locale/ht"

interface IBookingDetailsFormProps {
    date: Date,
    time: number,
    guests: number,
    changeTime: (time: number) => void
    changeGuests: (guests: number) => void
    changeDate: (date: Date) => void
}

export const BookingDetailsForm = (props: IBookingDetailsFormProps) => {

    const [date, setDate] = useState<Date>(new Date())
    const [time, setTime] = useState(18)
    const [guests, setGuests] = useState(1)
    const [fullyBooked, setFullyBooked] = useState(false)


    useEffect(() => {
        axios.post("http://localhost:8000/validate/dateandtime", {date, time, guests})
        .then(result => {
            setFullyBooked(result.data.fullyBooked) 
        })
    }, [guests, time, date])

    const handleGuests = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("called!")
        let val = parseInt(e.target.value) || 1
        if (val > 90 ) val = 90
        setGuests(val)
        props.changeGuests(val)
    }
    const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeDate(new Date(e.target.value))
    }


    return <div className="phase-container date-phase">
        <div className="date-container">
            <Calendar onChange={() => {}} value={props.date} defaultValue={props.date}/>
            {/* <input type="date" min={new Date().toISOString().split("T")[0]} defaultValue={new Date().toLocaleDateString()} onChange={changeDate}></input> */}
        </div>
        <div className="time-container">
            <span className="title">Time</span>
            <div className="choice-wrapper">
                <span className={`${props.time === 18 && "selected"}`} onClick={() => props.changeTime(18)}>18 - 20</span>
                <span className={`${props.time === 21 && "selected"}`} onClick={() => props.changeTime(21)}>21 - 23</span>
            </div>
        </div>
        <div className="guests-container">
            <span>Guests</span>
            <input type="number" onChange={handleGuests} value={props.guests}/>
        </div>
        {fullyBooked && <p className="available available-false">There are no available tables</p> || <p className="available">There are available tables</p>}
    </div>
    
}