var express = require('express');
var router = express.Router();
const TicketController = require('../controllers/ticketController');

router.get('/test', function (req, res) {
    res.status(200).json({
        message: "test route up and running...."
    })
})

// Route to issue a new ticket
router.post('/issue', async (req, res) => {
    try {
        const { guests } = req.body;
        if (!guests || !Array.isArray(guests) || guests.length === 0) {
            return res.status(400).json({ error: 'Invalid guests data' });
        }
        const issuedTicket = await TicketController.issueTicket(guests);
        res.status(201).json(issuedTicket);
    } catch (error) {
        console.error('Error issuing ticket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get all tickets
router.get('/all', async (req, res) => {
    try {
        const ticketDetails = await TicketController.getAllTickets();
        res.json(ticketDetails);
    } catch (error) {
        console.error('Error getting all tickets:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get ticket details by ID
router.delete('/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        if (!uid) {
            return res.status(400).json({ error: 'Invalid UID' });
        }
        const ticket = await TicketController.deleteTicket(uid);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.json({ message: 'Ticket deleted successfully', deletedTicket: ticket });
    } catch (error) {
        console.error('Error deleting ticket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to delete a ticket
router.get('/:ticketId', async (req, res) => {
    try {
        const { ticketId } = req.params;
        if (!ticketId) {
            return res.status(400).json({ error: 'Invalid ticket ID' });
        }
        const ticketDetails = await TicketController.getTicketDetails(ticketId);
        
        res.json(ticketDetails);
    } catch (error) {
        console.error('Error getting ticket details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router