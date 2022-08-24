import "../scss/main.scss"

interface IBookingPhaseProps {
    phase: number
    changePhase(to: number): void
}

export const BookingPhase = (props: IBookingPhaseProps) => {
    return <>
        <div>
            <button onClick={() => {props.changePhase(props.phase - 1)}}>- 1</button>
            <button onClick={() => {props.changePhase(props.phase + 1)}}>+ 1</button>
        </div>
        <div className="booking-phase-display">
            <div className={`booking-phase phase-date ${props.phase === 1 && 'current'}`} onClick={() => props.changePhase(1)}>
                <span className="phase-number">
                    1
                </span>
                <span className="phase-name">
                    Date
                </span>
            </div>
            <div className="dot"></div>
            <div className={`booking-phase phase-date ${props.phase === 2 && 'current'}`} onClick={() => props.changePhase(2)}>
                <span className="phase-number">
                    2
                </span>
                <span className="phase-name">
                    Information
                </span>
            </div>
            <div className="dot"></div>
            <div className={`booking-phase phase-date ${props.phase === 3 && 'current'}`} onClick={() => props.changePhase(3)}>
                <span className="phase-number">
                    3
                </span>
                <span className="phase-name">
                    Review
                </span>
            </div>
            <div className="dot"></div>
            <div className={`booking-phase phase-date ${props.phase === 4 && 'current'}`} onClick={() => props.changePhase(4)}>
                <span className="phase-number">
                    4
                </span>
                <span className="phase-name">
                    Confirmation
                </span>
            </div>
        </div>
    </>
}