require("dotenv").config();
require("./mongoose");
const express = require("express");
const nodemailer = require("nodemailer");
const { Types } = require("mongoose");
const BookingModel = require("./models/BookingModel");
const CustomerModel = require("./models/CustomerModel");
const {
  customerExists,
  isFullyBooked,
  guestsToTables,
  multipleBookings,
  isFullyBookedEdit,
} = require("./utils");
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

app.use("/validate", require("./routes/validate"))

app.get("/", async (req, res) => {
  res.send({
    msg: "Hello World!",
  });
});

// Hämtar bokningen som matchar id:t som man skickar i queryn
app.get("/getbooking", async (req, res) => {
  let { id } = req.query;
  try {
    const booking = await BookingModel.findOne({ _id: id })
      .populate("customer")
      .lean();
    res.send(booking);
    return;
  } catch (err) {
    console.log(err);
    res.send("error");
    return;
  }
});

//Hämtar alla bokningar, bör användas av ändast av admin
app.get("/getallbookings", async (req, res) => {
  let { id } = req.query;
  try {
    const booking = await BookingModel.find({})
      .populate("customer")
      .limit(500)
      .lean();
    res.send(booking);
    return;
  } catch (err) {
    res.send(err);
    return;
  }
});

//Hämtar alla bokningar som ställts av kunden vars id du skickar med queryn
app.get("/getbookingsbycustomer", async (req, res) => {
  let { id } = req.query;
  try {
    const bookings = await BookingModel.find({ customer: id })
      .populate("customer")
      .sort({date: -1})
      .lean();
    res.send(bookings);
    return;
  } catch (err) {
    res.send(err);
    return;
  }
});

//Hämtar alla bokningar från givet datum
app.get("/getbookingsbydate", async (req, res) => {
  let { date } = req.query;
  try {
    const bookings = await BookingModel.find({ date: date })
      .populate("customer")
      .lean();
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

app.post("/cleardb", async (req, res) => {
  try {
    await BookingModel.deleteMany({});
    await CustomerModel.deleteMany({});
    res.send({ msg: "Database successfully cleared!" });
  } catch (err) {
    console.log(err);
    res.send({ err });
  }
});

app.post("/book", async (req, res) => {
  console.log(req.body)
  let { date, time, guests, name, email, phone } = req.body;
  if (guests < 1) guests = 1;
  console.log("date:", date)

  let customer = new CustomerModel({ name: name, email: email, phone: phone });
  let booking = new BookingModel({
    date: date,
    time: time,
    guests: guests,
    tables: guestsToTables(guests),
    customer: customer._id,
  });
  console.log("date in booking:", booking.date)

  if (await isFullyBooked(date, time, booking.tables)) {
    console.log("Day & time is fully booked");
    res.send(false);
    return;
  }
  console.log("Day & time has available tables");

  let existingCustomer = await customerExists(customer.email);
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

  console.log(booking, customer);
  res.send({
    booking,
    customer,
  });
});

//Tar bort en bokning via adminsidan
app.delete("/admindeletebooking/:booking", async (req, res) => {
  let booking = JSON.parse(req.params.booking);
  let moreReservations = await multipleBookings(booking);

  if (!moreReservations) {
    CustomerModel.deleteOne({ _id: booking.customer }, (err, result) => {});
  }
  BookingModel.deleteOne({ _id: booking._id }, (err, result) => {});
  console.log("hello");
  res.send(true);
});

//Redigerar en bokning, inklusive customer via admin sidan
app.post("/admineditbooking/:booking", async (req, res) => {
  const booking = JSON.parse(req.params.booking);
  const customer = booking.customer;

  if (
    await isFullyBookedEdit(
      booking.date,
      booking.time,
      guestsToTables(booking.guests),
      booking
    )
  ) {
    res.send(true);
    return;
  } else {
    await BookingModel.updateOne(
      { _id: booking._id },
      {
        $set: {
          date: booking.date,
          time: booking.time,
          guests: booking.guests,
          tables: guestsToTables(booking.guests),
        },
      }
    );

    await CustomerModel.updateOne(
      { _id: customer._id },
      {
        $set: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        },
      }
    );
  }

  res.send(false);
});

app.post("/send-email", async (req, res) => {
  const newdate = req.body.booking.date;
  const date = new Date(newdate).toLocaleDateString();

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cenamatgatan@gmail.com",
      pass: "deefoqwvuimsluss",
    },
  });

  var mailOptions = {
    from: "cenamatgatan@gmail.com",
    to: req.body.customer.email,
    subject: "Booking Confirmation",
    text:
      "Hello " +
      req.body.customer.name +
      "! We welcome you to Cena at " +
      req.body.booking.time +
      "o'clock on the " +
      date +
      ". Where a table of " +
      req.body.booking.guests +
      " will be waiting for you. To cancel your reservation, please follow the link: http://localhost:3000/cancel/" +
      req.body.booking._id,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

app.delete("/cancel/:id", async (req, res) => {
  let id = req.params.id;
  let booking = await BookingModel.findOne({ _id: id });
  let customer = await CustomerModel.findOne({ _id: booking.customer });
  const newdate = booking.date;
  const date = new Date(newdate).toLocaleDateString();

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cenamatgatan@gmail.com",
      pass: "deefoqwvuimsluss",
    },
  });
  var mailOptions = {
    from: "cenamatgatan@gmail.com",
    to: customer.email,
    subject: "Booking Cancelled",
    text:
      "Hello " +
      customer.name +
      "! We have cancelled your reservation at " +
      booking.time +
      " o'clock on the " +
      date +
      ". We hope to see you again soon!",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  BookingModel.deleteOne({ _id: id }, (err, result) => {
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
