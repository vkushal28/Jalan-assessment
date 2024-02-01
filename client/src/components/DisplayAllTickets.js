import React from 'react'
import TicketDetails from './TicketDetails'

const DisplayAllTickets = ({
    allTickets
}) => {
    return (
        <div class='tickets-wrapper'>
            {allTickets?.map((tick, index) => (
                <TicketDetails ticket={tick} index={index + 1} />
            ))}
        </div>
    )
}

export default DisplayAllTickets