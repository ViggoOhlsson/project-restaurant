import { useState } from "react"
import "../scss/main.scss"

interface IBookingPhaseProps {
    phase: number
}

export const BookingPhase = (props: IBookingPhaseProps) => {

    const [phase, setPhase] = useState(props.phase)

    console.log(phase)

    return <div className="booking-phase-container">
    <button onClick={() => {setPhase(phase - 1)}}>- 1</button>
    <button onClick={() => {setPhase(phase + 1)}}>+ 1</button>
        <div className={`booking-phase phase-date ${phase == 1 && 'current'}`}>
            <span className="phase-number">
                1
            </span>
            <span className="phase-name">
                Date
            </span>
        </div>
        <div className="dot"></div>
        <div className={`booking-phase phase-date ${phase == 2 && 'current'}`}>
            <span className="phase-number">
                2
            </span>
            <span className="phase-name">
                Information
            </span>
        </div>
        <div className="dot"></div>
        <div className={`booking-phase phase-date ${phase == 3 && 'current'}`}>
            <span className="phase-number">
                3
            </span>
            <span className="phase-name">
                Review
            </span>
        </div>
        <div className="dot"></div>
        <div className={`booking-phase phase-date ${phase == 4 && 'current'}`}>
            <span className="phase-number">
                4
            </span>
            <span className="phase-name">
                Confirmation
            </span>
        </div>
    </div>
}