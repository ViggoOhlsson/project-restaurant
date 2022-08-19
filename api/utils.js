const BookingModel = require("./models/BookingModel")
const CustomerModel = require("./models/CustomerModel")

const utils = {
    customerExists: async (email) => {
        try {
            let customer = await CustomerModel.findOne({email: email})
            if (customer) {
                return customer
            } else {
                return false
            }
        } catch (err) {
            return err
        }
    },
    isFullyBooked: async (date, time) => {
        let bookings = (await BookingModel.find({date: date, time: time}).lean()).length
        fullyBooked = bookings > 14
        console.log("fully booked:", fullyBooked)
        return (fullyBooked)
    }
}

module.exports = utils