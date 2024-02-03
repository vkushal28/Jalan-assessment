const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  guests: [{
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    }
  }],
  totalCharges: {
    type: Number,
    required: true,
  },
  uid: { type: Number, required: true },
  created_at: { type: Date, default: Date.now() }
});

const TicketModel = mongoose.model('Ticket', ticketSchema);

class Ticket {
  constructor(data) {
    this.model = new TicketModel(data);
  }

  async save() {
    return this.model.save();
  }

  static async getById(ticketId) {
    return TicketModel.findById(ticketId);
  }

  static async findOne(filter) {
    return TicketModel.findOne(filter);
  }

  static async findOneAndDelete(filter) {
    return TicketModel.findOneAndDelete(filter);
  }

  static async find({ sortFilter }) {
    return TicketModel.find().sort(sortFilter);
  }

  static async countDocuments(filterCondition) {
    return TicketModel.countDocuments(filterCondition);
  }
}

module.exports = Ticket;
