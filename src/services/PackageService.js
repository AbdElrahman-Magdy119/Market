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

const PackageService = {
    getAllPackages() {
        return apiClient.get('/packages');
    },
    addPackage(role) {
        return apiClient.post('/packages',role);
    },
    updatePackage(id,role) {
        return apiClient.put(`/packages/${id}`,role);
    },
    deletePackage(id) {
        return apiClient.delete(`/packages/${id}`);
    },
};


export default PackageService;
