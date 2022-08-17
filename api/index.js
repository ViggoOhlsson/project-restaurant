require("dotenv").config()
require("./mongoose")
const express = require("express")
const { Types } = require("mongoose")
const BookingModel = require("./models/BookingModel")
const CustomerModel = require("./models/CustomerModel")
const port = 8000
const app = express()

app.get("/", async (req,res) => {
    let newCustomer = {
        name: "Placeholder",
        email: "example@domain.net",
        phone: 1232343445
    }
    newCustomer = new CustomerModel(newCustomer)
    await newCustomer.save()

    let newBooking = {
        date: new Date().toLocaleDateString(),
        time: 21,
        guests: 6,
        customer: Types.ObjectId(await CustomerModel.findOne({}, {_id: 1}))    
    }
    newBooking = new BookingModel(newBooking)
    await newBooking.save()

    res.send("Hello World! " + new Date().toLocaleDateString())
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})