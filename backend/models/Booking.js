const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // your user collection
    required: true,
  },
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  seatsBooked: {
    type: Number,
    required: true,
    default: 1,
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
