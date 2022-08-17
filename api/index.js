require("dotenv").config()
require("./mongoose")
const express = require("express")
const { Types } = require("mongoose")
const BookingModel = require("./models/BookingModel")
const CustomerModel = require("./models/CustomerModel")
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
    await BookingModel.remove()
    await CustomerModel.remove()

    let newCustomer = {
        name: "Placeholder",
        email: "example@domain.net",
        phone: 1232343445
    }
    newCustomer = new CustomerModel(newCustomer)
    await newCustomer.save()

    let newBooking = {
        date: new Date(2022, 8, 17),
        time: 21,
        guests: 6,
        customer: Types.ObjectId(await CustomerModel.findOne({}, {_id: 1}))    
    }
    newBooking = new BookingModel(newBooking)
    await newBooking.save()

    res.send({
        newBooking,
        newCustomer
    })
})
app.post("/book", async (req,res) => {
    let { date, time, guests, name, email, phone } = req.body
    


})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})