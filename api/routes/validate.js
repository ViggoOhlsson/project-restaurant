const express = require("express")
const { isFullyBooked, guestsToTables } = require("../utils")
const app = express.Router()


app.post("/dateandtime", async (req, res) => {
    let { date, time, guests } = req.body
    let fullyBooked = await isFullyBooked(date, time, guestsToTables(guests))

    res.send({
        fullyBooked
    })
})

module.exports = app