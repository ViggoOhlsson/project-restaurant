import { IBooking } from "../models/IBooking";

interface IBookingReviewProps {
    booking: IBooking
    placeBooking: void
}

export const BookingReview = (props: IBookingReviewProps) => {


    return <div className="phase-container review-phase">
            <div className="booking-info-container">
              <div className="date">
                <span>Date</span>
                <p>{props.booking.date.split("-").splice(1, 2).join("-")}</p>
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
                <p>{props.booking.customer.name}</p>
                <p>{props.booking.customer.email}</p>
                <p>{props.booking.customer.phone}</p>
              </div>
            </div>
            <button onClick={placeBooking} className="submit-button">
              <i className="fa-solid fa-check"></i>
              <span>Place Booking</span>
            </button>
          </div>
}