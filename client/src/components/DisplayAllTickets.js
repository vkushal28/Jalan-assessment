import React from 'react'
import TicketDetails from './TicketDetails'

const DisplayAllTickets = ({
    allTickets,
    deleteCB
}) => {
    return (
        <div class='tickets-wrapper'>
            {allTickets?.map((tick, index) => (
                <TicketDetails ticket={tick} deleteCB={deleteCB}/>
            ))}
        </div>
    )
}

export default DisplayAllTickets