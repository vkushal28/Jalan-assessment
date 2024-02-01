import axios from 'axios';

const API_BASE_URL = "http://localhost:3004";


const ticketService = {
    issueTicket: async (guests) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/ticket/issue`, { guests });
            return response.data;
        } catch (error) {
            console.error('Error issuing ticket:', error);
            throw error;
        }
    },

    getTicketDetails: async (ticketId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/ticket/${ticketId}`);
            return response.data;
        } catch (error) {
            console.error('Error getting ticket details:', error);
            throw error;
        }
    },

    getAllTickets: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/ticket/all`);
            return response.data;
        } catch (error) {
            console.error('Error getting all tickets:', error);
            throw error;
        }
    },
};

export default ticketService;