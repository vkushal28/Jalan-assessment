import React, { useState } from 'react';
import moment from 'moment';
import ticketService from '../services/ticketService';

const TicketDetails = ({ ticket, deleteCB }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    if (!ticket) {
        return <div>No ticket details available</div>;
    }

    const handleDeleteTicket = async () => {
        if (ticket.uid) {
            try {
                setIsDeleting(true);
                await ticketService.deleteTicket(ticket.uid);
                deleteCB();
            } catch (error) {
                console.error('Error deleting ticket:', error);
            } finally {
                setIsDeleting(false);
            }
        }
    }

    return (
        <div class="card">
            <div class="card-header">
                <h4>Ticket #{ticket.uid}</h4>
                <p>{moment(ticket.created_at).format('MMMM Do YYYY, h:mm a')}</p>
                <h3>Total Charges: {ticket.totalCharges}</h3>
                <button
                    class="delete-ticket"
                    onClick={handleDeleteTicket}
                    disabled={isDeleting}
                >
                    X
                </button>
            </div>
            <div class="card-body">
                <h3>Guests:</h3>
                {ticket?.guests?.map((guest, index) => (
                    <div key={index}>
                        <p>{index + 1}. {`${guest.name}, Age: ${guest.age}`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicketDetails;
