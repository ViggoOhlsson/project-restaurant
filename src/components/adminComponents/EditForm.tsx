import { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { IBooking } from "../../models/IBooking";
import { IValidateForm } from "../../models/IValidateForm";

interface IEditFormProps {
  editingBooking: IBooking;
  fullyBooked: boolean;
  handleSave(e: FormEvent): void;
  changeInfo(e: ChangeEvent<HTMLInputElement>): void;
  changeSelect(e: ChangeEvent<HTMLSelectElement>): void;
  changeUser(e: ChangeEvent<HTMLInputElement>): void;
  validate: IValidateForm;
}
export const EditForm = (props: IEditFormProps) => {
  return (
    <>
      <form
        className="admin-edit__section admin-edit__section--form"
        onSubmit={props.handleSave}
        noValidate
      >
        {props.fullyBooked && (
          <span className="form__error">Not enough available tables!</span>
        )}

        <div className="form__info">
          <div className="form__date">
            {!props.validate.date ? (
              <div className="div__error">
                <label htmlFor="date">Date</label>
                <span className="form__error">
                  {" "}
                  <i className="fa-solid fa-triangle-exclamation"></i> This
                  field is required
                </span>
              </div>
            ) : (
              <label htmlFor="date">Date</label>
            )}
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
            {!props.validate.time ? (
              <div className="div__error">
                <label htmlFor="time">Time</label>
                <span className="form__error form__error--small">
                  {" "}
                  <i className="fa-solid fa-triangle-exclamation"></i>
                </span>
              </div>
            ) : (
              <label htmlFor="time">Time</label>
            )}
            <select name="time" id="name" onChange={props.changeSelect}>
              {props.editingBooking.time === 18 && (
                <>
                  <option value="18" selected>
                    18
                  </option>
                  <option value="21">21</option>
                </>
              )}
              {props.editingBooking.time === 21 && (
                <>
                  <option value="18">18</option>
                  <option value="21" selected>
                    21
                  </option>
                </>
              )}
            </select>
          </div>
          <div className="form__guests">
            {!props.validate.guests ? (
              <div className="div__error">
                <label htmlFor="guests">Guests</label>
                <span className="form__error form__error--small">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                </span>
              </div>
            ) : (
              <label htmlFor="guests">Guests</label>
            )}
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
            {!props.validate.name ? (
              <div className="div__error">
                <label htmlFor="name">Name</label>
                <span className="form__error">
                  {" "}
                  <i className="fa-solid fa-triangle-exclamation"></i> Name has
                  to be between 1-64 characters
                </span>
              </div>
            ) : (
              <label htmlFor="name">Name</label>
            )}

            <input
              type="text"
              name="name"
              value={props.editingBooking.customer.name}
              onChange={props.changeUser}
            />
          </div>
          <div className="form__email">
            {!props.validate.email ? (
              <div className="div__error">
                <label htmlFor="email">Email</label>
                <span className="form__error">
                  {" "}
                  <i className="fa-solid fa-triangle-exclamation"></i> Enter a
                  valid email
                </span>
              </div>
            ) : (
              <label htmlFor="email">Email</label>
            )}
            <input
              type="email"
              name="email"
              value={props.editingBooking.customer.email}
              onChange={props.changeUser}
            />
          </div>
          <div className="form__phone">
            {!props.validate.phone ? (
              <div className="div__error">
                <label htmlFor="phone">Phone</label>
                <span className="form__error">
                  {" "}
                  <i className="fa-solid fa-triangle-exclamation"></i> Enter a
                  valid phone number
                </span>
              </div>
            ) : (
              <label htmlFor="phone">Phone</label>
            )}
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
          <button className="form__update">Save reservation</button>
        </div>
      </form>
    </>
  );
};
