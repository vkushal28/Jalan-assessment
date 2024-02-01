import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import GuestForm from './components/GuestForm';
import ticketService from './services/ticketService';
import Loader from './common/Loader';
import VerifyTickets from './components/VerifyTickets';
import DisplayAllTickets from './components/DisplayAllTickets';

function App() {
  const [allTickets, setAllTickets] = useState([]);
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
    <Router>
      <div className="App">
        <h1>Zoo Ticketing System</h1>

        <nav>
          <Link to="/">
            <button className="nav-button">Home</button>
          </Link>
          <Link to="/verify-tickets">
            <button className="nav-button">Verify Tickets</button>
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<>
            <GuestForm
              onAddGuest={handleAddGuest}
              loading={isLoading}
              guestAdded={areGuestsAdded}
              resetAddGuest={resetAddGuest}
            />
            <hr />
            {isLoadingAllTickets && <Loader />}
            {allTickets && allTickets.length ? <DisplayAllTickets allTickets={allTickets}/> :
              !isLoadingAllTickets ? <div>No ticket details available</div>
                : null}
          </>} />
          <Route path="/verify-tickets" element={<VerifyTickets />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
