import axios from 'axios';
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        // Add any common headers if needed
        'Content-Type': 'application/json',
        'Accept':'application/json'
    },
});

const apiService = {
    login(credentials) {
        return apiClient.post('/login', credentials);
    },
    register(credentials) {
        return apiClient.post('/register', credentials);
    },
};


export default apiService;
