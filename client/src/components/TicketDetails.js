import React from 'react';
import moment from 'moment';

const TicketDetails = ({ ticket, index }) => {
    if (!ticket) {
        return <div>No ticket details available</div>;
    }

    return (
        <div class="card">
                <div class="card-header">
                    <h4>Ticket #{ticket.uid}</h4>
                    <p>{moment(ticket.created_at).format('MMMM Do YYYY, h:mm a')}</p>
                    <h3>Total Charges: {ticket.totalCharges}</h3>
                </div>
                <div class="card-body">
                    <h3>Guests:</h3>
                    {ticket?.guests?.map((guest, index) => (
                        <div key={index}>
                            <p>{index+1}. {`${guest.name}, Age: ${guest.age}`}</p>
                        </div>
                    ))}
                </div>
        </div>
    );
};

export default TicketDetails;
