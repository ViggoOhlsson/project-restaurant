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
   
    if(bookings.length === 1){
        return false;
    }else{
        return true;
    }
  },
  //Kollar om dagen och tiden har tillräckligt många lediga bord
  isFullyBooked: async (date, time, tables) => {
    
    let bookings = await BookingModel.find(
      { date: date, time: time },
      { _id: -1, tables: 1 }
    ).lean();
    let bookedTables = bookings.reduce((amt, booking) => amt + booking.tables, 0);
    return bookedTables + tables > 15;
  },
  isFullyBookedEdit: async (date, time, tables, booking) => {
    let existingBooking = await BookingModel.findOne({_id: booking._id})

    let bookings = await BookingModel.find(
      { date: date, time: time },
      { _id: -1, tables: 1 }
    ).lean();
    let bookedTables = bookings.reduce((amt, booking) => {
      return amt + booking.tables;
    }, 0);
    if(existingBooking){
        return bookedTables - existingBooking.tables + tables > 15;
    }
    return bookedTables + tables > 15;
  },
  guestsToTables: (guests) => {
    let tables = Math.ceil(guests / 6);
    return tables;
  },
};

module.exports = utils;
