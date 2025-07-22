const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

// Create a new flight (Admin only)
router.post('/add', async (req, res) => {
  try {
    const newFlight = new Flight(req.body);
    await newFlight.save();
    res.status(201).json({ message: 'Flight added successfully', flight: newFlight });
  } catch (err) {
    res.status(500).json({ error: 'Error adding flight', details: err.message });
  }
});

// Get all flights
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching flights', details: err.message });
  }
});

// Get a single flight by ID
router.get('/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ error: 'Flight not found' });
    res.status(200).json(flight);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching flight', details: err.message });
  }
});

// Update flight by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFlight) return res.status(404).json({ error: 'Flight not found' });
    res.status(200).json({ message: 'Flight updated', flight: updatedFlight });
  } catch (err) {
    res.status(500).json({ error: 'Error updating flight', details: err.message });
  }
});

// Delete flight by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
    if (!deletedFlight) return res.status(404).json({ error: 'Flight not found' });
    res.status(200).json({ message: 'Flight deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting flight', details: err.message });
  }
});

module.exports = router;
