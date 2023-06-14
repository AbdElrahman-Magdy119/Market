import axios from 'axios';
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        // Add any common headers if needed
        'Content-Type': 'application/json',
        'Accept':'application/json',
        // 'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
});


const HomeService = {
    getAllCategories() {
        return apiClient.get(`/home/categories`);
    }
};


export default HomeService;