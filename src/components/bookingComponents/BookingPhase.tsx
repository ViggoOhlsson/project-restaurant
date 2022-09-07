import "../../scss/main.scss";

interface IBookingPhaseProps {
  phase: number;
  changePhase(to: number): void;
}

export const BookingPhase = (props: IBookingPhaseProps) => {
  return (
    <>
      <div className="booking-phase-display">
        <div
          className={`booking-phase phase-date ${
            props.phase === 1 && "current"
          }`}
        >
          <span className="phase-number">1</span>
          <span className="phase-name">Date</span>
        </div>
        <div className="dot"></div>
        <div
          className={`booking-phase phase-date ${
            props.phase === 2 && "current"
          }`}
        >
          <span className="phase-number">2</span>
          <span className="phase-name">Information</span>
        </div>
        <div className="dot"></div>
        <div
          className={`booking-phase phase-date ${
            props.phase === 3 && "current"
          }`}
        >
          <span className="phase-number">3</span>
          <span className="phase-name">Review</span>
        </div>
        <div className="dot"></div>
        <div
          className={`booking-phase phase-date ${
            props.phase === 4 && "current"
          }`}
        >
          <span className="phase-number">4</span>
          <span className="phase-name">Confirmation</span>
        </div>
      </div>
    </>
  );
};
