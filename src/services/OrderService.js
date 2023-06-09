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
    getOrderById(orderId){
        return apiClient.get(`/order/${orderId}`);
    },
    updateOrder(orderId, order) {
        console.log(order);
        return apiClient.put(`/order/${orderId}`, order);
    },
    deleteOrder(orderId) {
        return apiClient.delete(`/order/${orderId}`);
    },
    createOrder(order){
        console.log(order)
        return apiClient.post(`/home/orders`, order);
    },
    paypal(order){
      return apiClient.post(`/payment`,order);
    }
};


export default OrderService;
