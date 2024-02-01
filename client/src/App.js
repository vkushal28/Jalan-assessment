import './App.css';
import { useState, useEffect, useCallback } from 'react';
import GuestForm from './components/GuestForm';
import TicketDetails from './components/TicketDetails';
import ticketService from './services/ticketService';
import Loader from './common/Loader';

function App() {
  const [allTickets, setAllTickets] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [areGuestsAdded, setAreGuestsAdded] = useState(false);
  const resetAddGuest = useCallback(() => setAreGuestsAdded(false), [])
  const [isLoadingAllTickets, setIsLoadingAllTickets] = useState(false);


  const handleAddGuest = async (guest) => {
    try {
      setIsLoading(true);
      const updatedTicket = await ticketService.issueTicket([...guest]);
      // setTicket(updatedTicket);
      reset();
    } catch (error) {
      console.error('Error issuing ticket:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGetTicketDetails = async (ticketId) => {
  //   try {
  //     const fetchedTicket = await ticketService.getTicketDetails(ticketId);
  //     setTicket(fetchedTicket);
  //   } catch (error) {
  //     // Handle error, e.g., display an error message
  //     console.error('Error getting ticket details:', error);
  //   }
  // };

  useEffect(() => {
    handleGetAllTickets();
  }, [])

  const handleGetAllTickets = async () => {
    try {
      setIsLoadingAllTickets(true);
      const allTickets = await ticketService.getAllTickets();
      setAllTickets(allTickets);
    } catch (error) {
      console.error('Error getting all tickets:', error);
    } finally {
      setIsLoadingAllTickets(false);
    }
  }

  const reset = () => {
    setAreGuestsAdded(true);
    handleGetAllTickets();
  }

  return (
    <div className="App">
      <h1>Zoo Ticketing System</h1>
      <GuestForm
        onAddGuest={handleAddGuest}
        loading={isLoading}
        guestAdded={areGuestsAdded}
        resetAddGuest={resetAddGuest}
      />

      {/* <label>
        Ticket ID:
        <input
          type="text"
          value={selectedTicketId}
          onChange={(e) => setSelectedTicketId(e.target.value)}
        />
      </label>
      <button onClick={handleGetTicketDetails}>Get Ticket Details</button> */}


      <hr />

      {isLoadingAllTickets && <Loader />}
      {allTickets && allTickets.length ? allTickets.map((tick, index) => (
        <ol key={index}>
          <li>
            <TicketDetails ticket={tick} index={index+1}/>
          </li>
        </ol>
      )) :
        !isLoadingAllTickets ? <div>No ticket details available</div>
          : null}
      {/* <TicketDetails ticket={ticket} /> */}
    </div>
  );
}

export default App;
