
import { IBookingPrimitive } from "../../models/IBooking";

interface IBookingReviewProps {
    booking: IBookingPrimitive
    placeBooking: () => void
    changePhase: (phase: number) => void
}

export const BookingReview = (props: IBookingReviewProps) => {

  const book = () => {
    props.placeBooking()
  }
  
  const prev = () => {
    props.changePhase(2)
  }


    return <>
    <div className="phase-container review-phase">
            <div className="booking-info-container">
              <div className="date">
                <span>Date</span>
                <p>{props.booking.date.toLocaleDateString().split("-").splice(1, 2).join("-")}</p>
              </div>
              <div className="guests">
                <span>Guests</span>
                <p>{props.booking.guests}</p>
              </div>
              <div className="time">
                <span>Time</span>
                <p>
                  {props.booking.time} - {props.booking.time + 2}
                </p>
              </div>
            </div>
            <div className="customer-info-container">
              <p>Contact Information</p>
              <div>
                <p>{props.booking.name}</p>
                <p>{props.booking.email}</p>
                <p>{props.booking.phone}</p>
              </div>
            </div>
            <button onClick={book} className="submit-button">
              <i className="fa-solid fa-check"></i>
              <span>Place Booking</span>
            </button>
          </div>
          <div className="change-phase-wrapper">
              <div className="navigator" onClick={prev} >
                  <i className="fa-solid fa-angle-left"></i> Previous
              </div>
          </div>
    </>
}