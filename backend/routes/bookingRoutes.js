const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

// Book a flight
router.post('/', async (req, res) => {
  const { userId, flightId, seatsBooked } = req.body;

  try {
    const flight = await Flight.findById(flightId);

    if (!flight) return res.status(404).json({ message: 'Flight not found' });

    if (flight.seatsAvailable < seatsBooked) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const booking = new Booking({ userId, flightId, seatsBooked });
    await booking.save();

    // Reduce seat count in the flight
    flight.seatsAvailable -= seatsBooked;
    await flight.save();

    res.status(201).json({ message: 'Flight booked successfully', booking });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get bookings by user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate('flightId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving bookings' });
  }
});

module.exports = router;
