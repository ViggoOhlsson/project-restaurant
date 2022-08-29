import { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { IBooking } from "../models/IBooking";

interface IEditFormProps {
  editingBooking: IBooking;
  fullyBooked: boolean;
  deleteBooking(id: string): void;
  handleSave(e: FormEvent): void;
  changeInfo(e: ChangeEvent<HTMLInputElement>): void;
  changeUser(e: ChangeEvent<HTMLInputElement>): void;
}
export const EditForm = (props: IEditFormProps) => {
  return (
    <div className="admin-edit">
      <h3 className="admin-edit__section admin-edit__section--heading">
        Edit reservation
      </h3>
      <form
        className="admin-edit__section admin-edit__section--form"
        onSubmit={props.handleSave}
      >
        {props.fullyBooked && (
          <span className="form__error">Not enough available tables!</span>
        )}

        <div className="form__info">
          <div className="form__date">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]} //Tar bort passerade datum
              name="date"
              value={new Date(props.editingBooking.date).toLocaleDateString()}
              onChange={props.changeInfo}
              placeholder="Date"
            />
          </div>
          <div className="form__time">
            <label htmlFor="time">Time</label>
            <input
              type="number"
              name="time"
              step="3"
              min="18"
              max="21"
              value={props.editingBooking.time}
              onChange={props.changeInfo}
              placeholder="Time"
            />
          </div>
          <div className="form__guests">
            <label htmlFor="guests">Guests</label>
            <input
              type="number"
              name="guests"
              min="1"
              max="90"
              value={props.editingBooking.guests}
              onChange={props.changeInfo}
              placeholder="Guests"
            />
          </div>
        </div>
        <div className="form__user">
          <div className="form__userName">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={props.editingBooking.customer.name}
              onChange={props.changeUser}
            />
          </div>
          <div className="form__email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={props.editingBooking.customer.email}
              onChange={props.changeUser}
            />
          </div>
          <div className="form__phone">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name="phone"
              value={props.editingBooking.customer.phone}
              onChange={props.changeUser}
            />
          </div>
        </div>
        <div className="form__buttons">
          <Link className="form__cancel" to={"/admin"}>
            Cancel
          </Link>
          <button className="form__update">Update reservation</button>
        </div>
      </form>
      <button
        className="admin-edit__section admin-edit__section--delete"
        onClick={() => {
          props.deleteBooking(props.editingBooking._id);
        }}
      >
        Remove reservation x
      </button>
    </div>
  );
};
