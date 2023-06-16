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
    getAllSubCategories() {
        return apiClient.get('/subcategories');
    },
    addSubCategory(category) {
        return apiClient.post('/subcategories', category)
    },
    updateSubCategory(id, category) {
        return apiClient.post(`/subcategories/${id}`, category);
    },
    deleteSubCategory(id) {
        return apiClient.delete(`/subcategories/${id}`);
    },
};


export default categoriesService;
