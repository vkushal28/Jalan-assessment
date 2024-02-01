const Ticket = require('../models/ticketModel');
const autoIncrement = require('../utils/auto-increment');

const calculateCharges = (age) => {
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

const issueTicket = async (req, res) => {
  try {
    const { guests } = req.body;
    if (!guests || !Array.isArray(guests) || guests.length === 0) {
      return res.status(400).json({ error: 'Invalid guests data' });
    }
    const uid = await autoIncrement.getNumOfDocs(Ticket);
    const totalCharges = guests.reduce((sum, guest) => sum + calculateCharges(guest.age), 0);
    const newTicket = new Ticket({
      guests,
      totalCharges,
      uid: uid + 1,
      created_at: new Date()
    });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error issuing ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTicketDetails = async (req, res) => {
  try {
    const { ticketId } = req.params;
    if (!ticketId) {
      return res.status(400).json({ error: 'Invalid ticket ID' });
    }
    const ticket = await Ticket.findOne({ uid: ticketId });
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    console.error('Error getting ticket details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllTickets = async (req, res, next) => {
  try {
    const allTickets = await Ticket.find().sort({ created_at: -1 });
    res.json(allTickets);
  } catch (error) {
    console.error('Error getting all tickets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const deleteTicket = async (req, res, next) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      return res.status(400).json({ error: 'Invalid UID' });
    }
    const ticket = await Ticket.findOneAndDelete({ uid });
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json({ message: 'Ticket deleted successfully', deletedTicket: ticket });

  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  issueTicket,
  getTicketDetails,
  getAllTickets,
  deleteTicket
};
