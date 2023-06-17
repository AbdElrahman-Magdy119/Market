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

const CartService = {
    getUserCart() {
        return apiClient.get('/cart');
    },
    addToCart(product) {
        return apiClient.post('/cart',product);
    },
    // updateRole(id,role) {
    //     return apiClient.put(`/roles/${id}`,role);
    // },
    // deleteRole(id) {
    //     return apiClient.delete(`/roles/${id}`);
    // },
};


export default CartService;