import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { IBooking } from "../../models/IBooking";
import { ShowSingleBooking } from "../adminComponents/ShowSingleBooking";

const linkStyle2 = {
  color: "#DCD4E2",
  textDecoration: "none",
};

export function CustomerCancel() {
  const [params, setParams] = useState(useParams());

  const [id, setId] = useState(params.id);

  const [deleteBooking, setDeleteBooking] = useState(false);

  const [adminView, setAdminView] = useState("");

  const [booking, setBooking] = useState<IBooking>({
    date: new Date(),
    time: 0,
    guests: 0,
    customer: {
      _id: "",
      name: "",
      email: "",
      phone: 0,
    },
    _id: "",
  });

  //Anropar api och hämtar alla bokningar
  useEffect(() => {
    axios.get("http://localhost:8000/getbooking?id=" + id).then((res) => {
      if (res.data === "error") {
        setAdminView("notfound");
      } else {
        setBooking(res.data);
        setAdminView("found");
      }
    });
  }, []);

  useEffect(() => {
    if (!deleteBooking) return;
    axios.delete("http://localhost:8000/cancel/" + id).then((res) => {
      console.log(res);
    });
  });

  function deleteReservation() {
    setDeleteBooking(true);
  }

  return (
    <>
      {!deleteBooking ? (
        <ShowSingleBooking
          booking={booking}
          deleteReservation={deleteReservation}
        ></ShowSingleBooking>
      ) : (
        <div className="cancelled">
          <p className="cancelled__text">
            Your reservation has been cancelled!
          </p>
          <button className="cancelled__button">
            <Link to={"/book"} style={linkStyle2}>
              Make a new reservation
            </Link>
          </button>
        </div>
      )}
    </>
  );
}
