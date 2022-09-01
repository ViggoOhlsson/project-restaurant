import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { IBooking } from "../../models/IBooking";
import { EditConfirmed } from "../EditConfirmed";
import { EditForm } from "../EditForm";

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

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    let date = editing.date;
    let time = editing.time;
    let guests = editing.guests;
    let name = editing.customer.name;
    let email = editing.customer.email;
    let phone = editing.customer.phone;

    let body = { date, time, guests, name, email, phone };
    try {
      let res = await axios.post("http://localhost:8000/book", body);
      setAdminView("done");
      let emailRes = await axios.post(
        "http://localhost:8000/send-email",
        res.data
      );
    } catch (err) {
      console.log(err);
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

  //Uppdaterar setEditing med kundinformation
  function handleUserChange(e: ChangeEvent<HTMLInputElement>) {
    setEditing({
      ...editing,
      customer: { ...editing.customer, [e.target.name]: e.target.value },
    });
  }

  function displayView() {
     if (adminView === "done") {
      return <EditConfirmed parentView="add" booking={editing}></EditConfirmed>;
    } else {
      return (
        <div className="admin-edit">
          <EditForm
            handleSave={handleSave}
            changeUser={handleUserChange}
            changeInfo={handleInfoChange}
            editingBooking={editing}
            fullyBooked={fullyBooked}
          ></EditForm>
        </div>
      );
    }
  }

  return (
    <main>{displayView()}</main>
  );
}
