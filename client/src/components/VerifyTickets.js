import React, { useState } from 'react'
import ticketService from '../services/ticketService';
import Loader from '../common/Loader';
import TicketDetails from './TicketDetails';

const VerifyTickets = () => {
    const [selectedTicketId, setSelectedTicketId] = useState(0);
    const [ticket, setTicket] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [noData, setNoData] = useState(false);

    const handleGetTicketDetails = async () => {
        if (selectedTicketId) {
            try {
                setIsLoading(true);
                const fetchedTicket = await ticketService.getTicketDetails(selectedTicketId);
                setTicket(fetchedTicket);
                setNoData(Boolean(fetchedTicket.error));
            } catch (error) {
                console.error('Error getting ticket details:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div>
            <h2>Verify Existing Ticket</h2>
            <label>
                Ticket ID:
                <input
                    type="number"
                    value={selectedTicketId}
                    onChange={(e) => setSelectedTicketId(Math.max(0, parseInt(e.target.value)))}
                />
            </label>
            <button
                onClick={handleGetTicketDetails}
                disabled={isLoading || !selectedTicketId}
            >
                Get Ticket Details
            </button>
            <hr />
            {isLoading && <Loader />}
            {
                ticket && !noData ?
                    <TicketDetails ticket={ticket} index={1} />
                    :
                    !isLoading && selectedTicketId && noData ? <div>No ticket details available</div>
                        : null}
        </div>
    )
}

export default VerifyTickets