const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    checkIn: String,
    checkOut: String,
    cardNumber: String,
    cardName: String,
    expiryDate: String,
    cvv: String,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
