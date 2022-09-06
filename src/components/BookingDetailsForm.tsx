import { ChangeEvent, useEffect, useState } from "react"
import { IBookingDetails } from "../models/IBookingDetails"

interface IBookingDetailsFormProps {
    changeBookingDetails(bookingDetails: IBookingDetails): void
}

export const BookingDetailsform = (props: IBookingDetailsFormProps) => {

    const [date, setDate] = useState("")
    const [time, setTime] = useState(18)
    const [guests, setGuests] = useState(1)

    const changeDate = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("Date:", e.target.value);
        setDate(e.target.value);
    };
    const changeGuests = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("Changed Booking Info")
        setGuests(parseInt(e.target.value))
    }

    useEffect(() => {
        props.changeBookingDetails({
            date: date,
            time: time,
            guests: guests
            
        })

    }, [time, date, guests])

    return <div className="phase-container date-phase">
        <div className="date-container">
            <input type="date" min={new Date().toISOString().split("T")[0]} defaultValue={date} onChange={changeDate}></input>
        </div>
        <div className="time-container">
            <span className="title">Time</span>
            <div className="choice-wrapper">
                <span className={`${time === 18 && "selected"}`} onClick={() => setTime(18)}>18 - 20</span>
                <span className={`${time === 21 && "selected"}`} onClick={() => setTime(21)}>21 - 23</span>
            </div>
        </div>
        <div className="guests-container">
            <input type="number" onChange={changeGuests} min={1} max={90} value={guests}/>
        </div>
    </div>
    
}