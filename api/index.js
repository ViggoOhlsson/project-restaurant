require("dotenv").config();
require("./mongoose");
const express = require("express");
const { Types } = require("mongoose");
const BookingModel = require("./models/BookingModel");
const CustomerModel = require("./models/CustomerModel");
const { customerExists } = require("./utils");
const port = 8000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", async (req, res) => {
  res.send({
    msg: "Hello World!",
  });
});

// Hämtar bokningen som matchar id:t som man skickar i queryn
app.get("/getbooking", async (req, res) => {
  let { id } = req.query;
  try {
    const booking = await BookingModel.findOne({ _id: id }).lean();
    res.send(booking);
    return;
  } catch (err) {
    res.send(err);
    return;
  }
});

//Hämtar alla bokningar, bör användas av ändast av admin
app.get("/getallbookings", async (req, res) => {
  let { id } = req.query;
  try {
    const booking = await BookingModel.find({}).limit(500).lean();
    res.send(booking);
    return;
  } catch (err) {
    res.send(err);
    return;
  }
});

//Hämtar alla bokningar som ställts av kunden vars id du skickar med queryn
app.get("/getbookingsbycustomer", async (req, res) => {
  let { id } = req.body;
  try {
    const bookings = await BookingModel.find({ customer: id }).lean();
    res.send(bookings);
    return;
  } catch (err) {
    res.send(err);
    return;
  }
});

//Kollar ifall en kund med givet email redan existerar, returnerar true eller false
app.get("/checkcustomer", async (req, res) => {
  let email = req.query.email || null;

  try {
    let customer = await CustomerModel.findOne({ email: email }).lean();
    // (customer) ? res.send({msg: "Customer Exists!", customer}) : res.send({msg: "Customer Does Not Exist!", customer});

    customer
      ? res.send({
          value: true,
          msg: "Customer exists",
        })
      : res.send({
          value: false,
          msg: "Customer does not exist",
        });

    return;
  } catch (err) {
    res.send(err.message);
    return;
  }
});

app.post("/book", async (req, res) => {
  let { date, time, guests, name, email, phone } = req.body;
  let customer = new CustomerModel({
    name: name,
    email: email,
    phone: phone,
  });
  let booking = new BookingModel({
    date: date,
    time: time,
    guests: guests,
    customer: customer._id,
  });
  let existingCustomer = await customerExists(customer.email);
  console.log(existingCustomer);
  if (existingCustomer) {
    booking.customer = new Types.ObjectId(existingCustomer._id);
    console.log(
      "Customer with that email already exists, replacing customer id on booking..."
    );
  } else {
    console.log("Customer is new, saving new customer to database...");
    await customer.save();
  }
  await booking.save();

  console.log(req.body);
  res.send({
    booking,
    customer,
  });
});

//Tar bort en bokning via admin sidan
app.post("/admindeletebooking/:id", async (req, res) => {
  let { id } = req.body;
  const deletedbooking = await BookingModel.deleteOne({ _id: id });
  res.send(deletedbooking);
});

//Redigerar en bokning via admin sidan
app.post("/admineditbooking/:editBookingObject", async (req, res) => {
  let { date } = req.body.date;
  let { time } = req.body.time;
  let { guests } = req.body.guests;
  let { id } = req.body._id;
  let { customer } = req.body.customer;

  let booking = { date, time, guests, id, customer };

  await BookingModel.updateOne(
    { _id: id },
    { $set: booking },
    (err, result) => {
      res.send("Success");
    }
  );
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
