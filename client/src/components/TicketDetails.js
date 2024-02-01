import React from 'react';
import moment from 'moment';

const TicketDetails = ({ ticket, index }) => {
    if (!ticket) {
        return <div>No ticket details available</div>;
    }

    return (
        <div>
            <h2>Ticket {index} (Created on {moment(ticket?.created_at).format('MMMM Do YYYY, h:mm a')}):</h2>
            {/* <p>Total Charges: {ticket.totalCharges}</p>
      <ul>
        {ticket.guests.map((guest, index) => (
          <li key={index}>{`Guest ${index + 1}: ${guest.name} (Age: ${guest.age})`}</li>
        ))}
      </ul> */}
            <p>Total Charges: {ticket.totalCharges}</p>
            <h3>Guests:</h3>
            {ticket?.guests?.map((guest, index) => (
                <div key={index}>
                    <p>{`${guest.name}, Age: ${guest.age}`}</p>
                </div>
            ))}
        </div>
    );
};

export default TicketDetails;
