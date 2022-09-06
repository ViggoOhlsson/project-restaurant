import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { IBooking } from "../../models/IBooking";
import { EditConfirmed } from "../adminComponents/EditConfirmed";
import { EditDeleteConfirm } from "../adminComponents/EditDeleteConfirm";
import { EditForm } from "../adminComponents/EditForm";

export function AdminEdit() {
  const [id, setId] = useState(useParams().id);

  const [fullyBooked, setFullyBooked] = useState(false);
  const [adminView, setAdminView] = useState("");

  const [booking, setBooking] = useState<IBooking>({
    date: new Date(),
    time: 0,
    guests: 0,
    _id: "",
    customer: {
      _id: "",
      name: "",
      email: "",
      phone: 0,
    },
  });

  const [editing, setEditing] = useState<IBooking>({
    date: new Date(),
    time: 0,
    guests: 0,
    _id: "",
    customer: {
      _id: "",
      name: "",
      email: "",
      phone: 0,
    },
  });

  //Söker igenom alla bokningar i databasen efter bokningen med rätt id
  useEffect(() => {
    axios.get("http://localhost:8000/getbooking?id=" + id).then((res) => {
      if (res.data === "error") {
        setAdminView("notfound");
      } else {
        setEditing(res.data);
      }
    });
  }, []);

  //Anropar api och skickar ett objekt till en post som redigerar bokning
  useEffect(() => {
    if (booking.time === 0) return;
    let bookingObject = JSON.stringify(booking);

    axios
      .post("http://localhost:8000/admineditbooking/" + bookingObject)
      .then((res) => {
        //res.data är en boolean som är true om det redan är fullbokat
        setFullyBooked(res.data);
        if (!res.data) {
          setAdminView("done");
        }
      });
  }, [booking]);

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

  function handleSave(e: FormEvent) {
    e.preventDefault();
    setBooking(editing);
  }

  function deleteBooking() {
    let bookingObject = JSON.stringify(editing);

    //Bör vara delete
    axios
      .delete("http://localhost:8000/admindeletebooking/" + bookingObject)
      .then((res) => {
        setAdminView("deleted");
      });
  }

  function displayView() {
    if (adminView === "deleted") {
      return <EditDeleteConfirm></EditDeleteConfirm>;
    } else if (adminView === "done") {
      return (
        <EditConfirmed parentView="edit" booking={booking}></EditConfirmed>
      );
    } else if (adminView === "notfound") {
      return <Navigate to={"/*"}></Navigate>;
    } else {
      return (
        <div className="admin-edit">
          <h3 className="admin-edit__section admin-edit__section--heading">
            Edit reservation
          </h3>
          <EditForm
            handleSave={handleSave}
            changeUser={handleUserChange}
            changeInfo={handleInfoChange}
            editingBooking={editing}
            fullyBooked={fullyBooked}
          ></EditForm>
          <button
            className="admin-edit__section admin-edit__section--delete"
            onClick={() => {
              deleteBooking();
            }}
          >
            Remove reservation <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      );
    }
  }

  return <main>{displayView()}</main>;
}
