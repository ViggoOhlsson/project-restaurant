import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { IBooking } from "../../models/IBooking";
import { IValidateForm } from "../../models/IValidateForm";
import { EditConfirmed } from "../adminComponents/EditConfirmed";
import { EditForm } from "../adminComponents/EditForm";

export function AdminAdd() {
  const [fullyBooked, setFullyBooked] = useState(false);
  const [adminView, setAdminView] = useState("");

  const [editing, setEditing] = useState<IBooking>({
    date: new Date(),
    time: 18,
    guests: 1,
    _id: "",
    customer: {
      _id: "",
      name: "",
      email: "",
      phone: 0,
    },
  });

  const [validateBooking, setValidateBooking] = useState<IValidateForm>({
    name: true,
    email: true,
    phone: true,
    time: true,
    date: true,
    guests: true,
  });

  async function handleSave(e: FormEvent) {
    e.preventDefault();

    if (validateForm()) {
      let date = new Date(editing.date).toLocaleDateString();
      let time = editing.time;
      let guests = editing.guests;
      let name = editing.customer.name;
      let email = editing.customer.email;
      let phone = editing.customer.phone;

      let body = { date, time, guests, name, email, phone };
      try {
        let res = await axios.post("http://localhost:8000/book", body);
        if (!res.data) {
          setFullyBooked(true);
        } else {
          setAdminView("done");
          let emailRes = await axios.post(
            "http://localhost:8000/send-email",
            res.data
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  //Uppdaterar setEditing med bokningsinformation
  function handleInfoChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.type === "number") {
      setEditing({ ...editing, [e.target.name]: +e.target.value });
    } else {
      setEditing({ ...editing, [e.target.name]: e.target.value });
    }
  }

  //Uppdaterar select-elementet för tiden
  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    setEditing({ ...editing, [e.target.name]: +e.target.value });
  }

  //Uppdaterar setEditing med kundinformation
  function handleUserChange(e: ChangeEvent<HTMLInputElement>) {
    setEditing({
      ...editing,
      customer: { ...editing.customer, [e.target.name]: e.target.value },
    });
  }

  //Kontrollerar att alla fält innehåller värden
  function validateForm() {
    let checkValid: IValidateForm = {
      name: true,
      email: true,
      phone: true,
      time: true,
      date: true,
      guests: true,
    };
    if (!editing.customer.name) {
      checkValid.name = false;
    }
    if (!editing.customer.email) {
      checkValid.email = false;
    }
    if (!editing.customer.phone) {
      checkValid.phone = false;
    }
    if (!editing.date) {
      checkValid.date = false;
    }
    if (!editing.guests) {
      checkValid.guests = false;
    }
    if (!editing.time) {
      checkValid.time = false;
    }

    setValidateBooking(checkValid);
    if (
      !checkValid.name ||
      !checkValid.email ||
      !checkValid.phone ||
      !checkValid.date ||
      !checkValid.guests ||
      !checkValid.time
    ) {
      return false;
    } else {
      return true;
    }
  }

  function displayView() {
    if (adminView === "done") {
      return <EditConfirmed parentView="add" booking={editing}></EditConfirmed>;
    } else {
      return (
        <div className="admin-edit">
          <h3 className="admin-edit__section admin-edit__section--heading">
            Create reservation
          </h3>
          <EditForm
            handleSave={handleSave}
            changeUser={handleUserChange}
            changeSelect={handleSelectChange}
            changeInfo={handleInfoChange}
            editingBooking={editing}
            validate={validateBooking}
            fullyBooked={fullyBooked}
          ></EditForm>
        </div>
      );
    }
  }

  return <main>{displayView()}</main>;
}
