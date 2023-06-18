import axios from 'axios';
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        // Add any common headers if needed
        'Content-Type': 'multipart/form-data',
        // 'Accept':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
});

const PackageService = {
    getAllPackages() {
        return apiClient.get('/packages');
    },
    addPackage(role) {
        return apiClient.post('/packages',role);
    },
    getPackageByID(id) {
        return apiClient.get(`/home/packageitems/${id}`);
    },
    updatePackage(id,role) {
        return apiClient.post(`/packages/${id}`,role);
    },
    deletePackage(id) {
        return apiClient.delete(`/packages/${id}`);
    },
};


export default PackageService;
