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
    increaseQuantity(prd_id, user_id){
      return apiClient.patch(`/inc/product/${prd_id}/user/${user_id}`);
    },
    decreaseQuantity(prd_id, user_id){
        return apiClient.patch(`/dec/product/${prd_id}/user/${user_id}`);
    },
    // updateRole(id,role) {
    //     return apiClient.put(`/roles/${id}`,role);
    // },
    deleteCart(id) {
        return apiClient.delete(`/cart/${id}`);
    },
    cart_arr:[],
};


export default CartService;