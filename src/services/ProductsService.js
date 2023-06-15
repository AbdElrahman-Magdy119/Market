import axios from 'axios';
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        // Add any common headers if needed
        'Content-Type': 'multipart/form-data',
        'Accept':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
});

const productService = {
    getAllProducts() {
        return apiClient.get('/products');
    },
    addProduct(product) {
        return apiClient.post('/products',product);
    },
    updateProduct(id, product) {
        return apiClient.post(`/products/${id}`,product);
    },
    deleteProduct(id) {
        return apiClient.delete(`/products/${id}`);
    },
};


export default productService;
