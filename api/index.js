require("dotenv").config()
require("./mongoose")
const express = require("express")
const { Types } = require("mongoose")
const BookingModel = require("./models/BookingModel")
const CustomerModel = require("./models/CustomerModel")
const { checkIfCustomerExists } = require("./utils")
const port = 8000
const app = express()

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000', );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get("/", async (req,res) => {

    res.send({
        newBooking,
        newCustomer
    })
})

app.get("/getbooking", async (req,res) => {
    let { id } = req.query
    try {
        const booking = await BookingModel.findOne({_id: id}).lean()
        res.send(booking)
        return
    } catch (err) {
        res.send(err)
        return
    }
})

app.get("/getallbookings", async (req,res) => {
    let { id } = req.query
    try {
        const booking = await BookingModel.find({}).limit(500).lean()
        res.send(booking)
        return
    } catch (err) {
        res.send(err)
        return
    }
})

app.get("/getbookingsbycustomer", async (req,res) => {
    let {id} = req.body
    try {
        const bookings = await BookingModel.find({ customer: id }).lean()
        res.send(bookings)
        return
    } catch (err) {
        res.send(err)
        return
    }
})

app.post("/book", async (req,res) => {
    let { year, month, day, time, guests, name, email, phone } = req.body

    let customer = new CustomerModel({
        name: name,
        email: email,
        phone: phone
    })
    (checkIfCustomerExists(email))
    let booking = new BookingModel({
        date: new Date(year, month, day),
        time: time,
        guests: guests,
        customer: newCustomer._id
    })



})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})