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


const OrderService = {
    getAllOrders() {
        return apiClient.get(`/order`);
    },
    updateOrder(orderId, order) {
        return apiClient.put(`/order/${orderId}`, order);
    },
    deleteOrder(orderId) {
        return apiClient.delete(`/order/${orderId}`);
    }
};


export default OrderService;
