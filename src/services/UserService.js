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

const WishListService = {
    getAllUsers() {
        return apiClient.get('/users');
    },
    updateUser(user_id, updatedUser){
        return apiClient.put(`/users/${user_id}/role`, updatedUser);
    }
};


export default WishListService;