var express = require('express');
var router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/test', function (req, res) {
    res.status(200).json({
        message: "test route up and running...."
    })
})

// Route to issue a new ticket
router.post('/issue', ticketController.issueTicket);

// Route to get all tickets
router.get('/all', ticketController.getAllTickets);

// Route to get ticket details by ID
router.get('/:ticketId', ticketController.getTicketDetails);

// Route to delete a ticket
router.delete('/:uid', ticketController.deleteTicket);

module.exports = router