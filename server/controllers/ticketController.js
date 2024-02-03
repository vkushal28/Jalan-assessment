const Ticket = require('../models/ticketModel');
const autoIncrement = require('../utils/auto-increment');

class TicketController {

  static calculateCharges = (age) => {
    if (age <= 2) {
      return 0;
    } else if (age < 18) {
      return 100;
    } else if (age < 60) {
      return 500;
    } else {
      return 300;
    }
  };

  static async issueTicket(guests) {
    const uid = await autoIncrement.getNumOfDocs(Ticket);
    const totalCharges = guests.reduce((sum, guest) => sum + this.calculateCharges(guest.age), 0);
    const newTicket = new Ticket({
      guests,
      totalCharges,
      uid: uid + 1,
      created_at: new Date()
    });
    await newTicket.save();
    return newTicket;
  };

  static async getTicketDetails(ticketId) {
    const ticket = await Ticket.findOne({ uid: ticketId });
    return ticket;
  };

  static async getAllTickets() {
    const allTickets = await Ticket.find({ created_at: -1 });
    return allTickets;
  }

  static async deleteTicket(uid) {
    const ticket = await Ticket.findOneAndDelete({ uid });
    return ticket;
  }
}

module.exports = TicketController;