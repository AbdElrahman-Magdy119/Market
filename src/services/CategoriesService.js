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

const categoriesService = {
    getAllCategories() {
        return apiClient.get('/categories');
    },
    addCategory(category) {
        return apiClient.post('/categories', category)
    },
    updateCategory(id, category) {
        return apiClient.put(`/categories/${id}`, category);
    },
    deleteCategory(id) {
        return apiClient.delete(`/categories/${id}`);
    },
};


export default categoriesService;
