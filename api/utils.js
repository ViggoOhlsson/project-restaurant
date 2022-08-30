const BookingModel = require("./models/BookingModel");
const CustomerModel = require("./models/CustomerModel");

const utils = {
  customerExists: async (email) => {
    try {
      let customer = await CustomerModel.findOne({ email: email });
      if (customer) {
        return customer;
      } else {
        return false;
      }
    } catch (err) {
      return err;
    }
  },

  multipleBookings: async (booking) => {
    let bookings = await BookingModel.find({ customer: booking.customer });
    console.log(bookings.length);
    if(bookings.length === 1){
        return false;
    }else{
        return true;
    }
  },
  //Kollar om dage och tiden har tillräckligt många lediga bord
  isFullyBooked: async (date, time, tables) => {
    let bookings = await BookingModel.find(
      { date: date, time: time },
      { _id: -1, tables: 1 }
    ).lean();
    let bookedTables = bookings.reduce((amt, booking) => {
      return amt + booking.tables;
    }, 0);
    return bookedTables + tables > 15;
  },
  guestsToTables: (guests) => {
    let tables = Math.ceil(guests / 6);
    return tables;
  },
};

module.exports = utils;
