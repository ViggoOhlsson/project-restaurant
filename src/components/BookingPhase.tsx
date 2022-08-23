import "../scss/main.scss"

interface IBookingPhaseProps {
    phase: number
}

export const BookingPhase = () => {



    return <div className="booking-phase-container">
        <div className="booking-phase phase-date">
            <span className="phase-number">
                1
            </span>
            <span className="phase-name">
                Date
            </span>
        </div>
        <div className="booking-phase phase-date">
            <span className="phase-number">
                1
            </span>
            <span className="phase-name">
                Date
            </span>
        </div>
        <div className="booking-phase phase-date">
            <span className="phase-number">
                1
            </span>
            <span className="phase-name">
                Date
            </span>
        </div>
    </div>
}