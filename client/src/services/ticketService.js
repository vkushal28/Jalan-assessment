import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;


const ticketService = {
    issueTicket: async (guests) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/ticket/issue`, { guests });
            return response.data;
        } catch (error) {
            console.error('Error issuing ticket:', error);
            return error?.response?.data
        }
    },

    getTicketDetails: async (ticketId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/ticket/${ticketId}`);
            return response.data;
        } catch (error) {
            console.error('Error getting ticket details:', error);
            return error?.response?.data
        }
    },

    getAllTickets: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/ticket/all`);
            return response.data;
        } catch (error) {
            console.error('Error getting all tickets:', error);
            return error?.response?.data
        }
    },
};

export default ticketService;