import { Link } from "react-router-dom";
import { IBooking } from "../../models/IBooking";

interface IShowBookingsProps {
  booking: IBooking;
}

export function ShowBookings(props: IShowBookingsProps) {
  return (
    <div className="admin__bookings__early">
      <p className="admin__bookings--info">{props.booking.customer.name}</p>
      <p className="admin__bookings--info">Party of {props.booking.guests}</p>
      <p className="admin__bookings--info">{props.booking.customer.phone}</p>
      <p className="admin__bookings--info admin__bookings--info-email">
        {props.booking.customer.email}
      </p>
      <Link
        className="admin__bookings--a"
        to={"/admin/edit-booking/" + props.booking._id}
      >
        {" "}
        <i className="admin__bookings__icon fa-solid fa-pen"></i>
      </Link>
    </div>
  );
}
