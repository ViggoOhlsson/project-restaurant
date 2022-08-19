const {Types, Schema, model} = require("mongoose")

const BookingSchema = Schema({
    date: {type: Date, required: true},
    time: {type: Number, enum: [18, 21], required: true},
    guests: {type:Number, required: true, min: 1, max: 90},
    customer: {type: Types.ObjectId, ref: "customers"},
    tables: {type:Number, required:true, default: 1}
})

const BookingModel = model("bookings", BookingSchema)

module.exports = BookingModel