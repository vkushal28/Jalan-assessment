const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const ticketSchema = new mongoose.Schema({
  guests: [guestSchema],
  totalCharges: {
    type: Number,
    required: true,
  },
  uid: { type: Number, required: true },
  created_at: { type: Date, default: Date.now() }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
