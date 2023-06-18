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
    },
    getTrendingProduct() {
        return apiClient.get(`/home/products?filter=trending`);
    },
    getAllPackages() {
        return apiClient.get(`/home/packages`);
    },
    getٍSubcategoryByCategoryID(id) {
        return apiClient.get(`/home/subcategories/${id}`);
    },
    getProductBySubcategory(id) {
        return apiClient.get(`/home/products?filter=${id}`);
    },
    getPackageByID(id) {
        return apiClient.get(`/home/packageitems/${id}`);
    },
};


export default HomeService;