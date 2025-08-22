const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // MongoDB Model

// Save Booking
router.post('/', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json({ message: 'Booking saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving booking' });
    }
});

// Fetch All Bookings for Admin
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching bookings' });
    }
});

module.exports = router;
