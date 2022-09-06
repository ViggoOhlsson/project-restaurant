import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"
import { IBookingDetails } from "../../models/IBookingDetails"
import { BookingDatePicker } from "./BookingDatePicker"
import Calendar from "react-calendar"

interface IBookingDetailsFormProps {
    changeBookingDetails(bookingDetails: IBookingDetails): void
}

export const BookingDetailsForm = (props: IBookingDetailsFormProps) => {

    const [date, setDate] = useState<Date>(new Date())
    const [time, setTime] = useState(18)
    const [guests, setGuests] = useState(1)
    const [fullyBooked, setFullyBooked] = useState(false)

    // const changeDate = (e: ChangeEvent<HTMLInputElement>) => {
    //     console.log("Date:", e.target.value);
    //     setDate(e.target.value);
    // };
    const changeGuests = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("Changed Booking Info")
        let val = parseInt(e.target.value)
        if (val > 90) val = 90
        if (val < 1 ) val = 1
        setGuests(val)
    }

    useEffect(() => {
        axios.post("http://localhost:8000/validate/dateandtime", {date, time, guests})
        .then(result => {
            setFullyBooked(result.data.fullyBooked) 
        })
    }, [guests, time, date])

    useEffect(() => {
        props.changeBookingDetails({
            date: date,
            time: time,
            guests: guests
        })

    }, [time, date, guests])

    return <div className="phase-container date-phase">
        <div className="date-container">
            <Calendar onChange={setDate} value={date} />
            {/* <input type="date" min={new Date().toISOString().split("T")[0]} defaultValue={new Date().toLocaleDateString()} onChange={changeDate}></input> */}
        </div>
        <div className="time-container">
            <span className="title">Time</span>
            <div className="choice-wrapper">
                <span className={`${time === 18 && "selected"}`} onClick={() => setTime(18)}>18 - 20</span>
                <span className={`${time === 21 && "selected"}`} onClick={() => setTime(21)}>21 - 23</span>
            </div>
        </div>
        <div className="guests-container">
            <span>Guests</span>
            <input type="number" onChange={changeGuests} value={guests}/>
        </div>
        {fullyBooked && <p className="available available-false">There are no available tables</p> || <p className="available">There are available tables</p>}
    </div>
    
}