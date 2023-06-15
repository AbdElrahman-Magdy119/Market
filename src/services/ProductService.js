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

const ProductService = {
    getProductById(id) {
        return apiClient.get(`/products/${id}`);
    }
};


export default ProductService;