import axios from 'axios';
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        // Add any common headers if needed
        'Content-Type': 'application/json',
        'Accept':'application/json'
    },
});

const authService = {
    login(credentials) {
        return apiClient.post('/login', credentials);
    },
    register(credentials) {
        return apiClient.post('/register', credentials);
    },
    googleLogin(token) {
        return apiClient.post('/login/google', { token });
    },
};


export default authService;
