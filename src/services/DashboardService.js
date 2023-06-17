import axios from 'axios';
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        // Add any common headers if needed
        'Content-Type': 'application/json',
        'Accept':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
});

const DashboardService = {
    analysis() {
        return apiClient.get('/dashboard');
    },
    getMostSoldProducts() {
        return apiClient.get('/dashboard/most-sold');
    },
    getMostUserPay() {
        return apiClient.get('/dashboard/user-pay');
    },
};


export default DashboardService;
