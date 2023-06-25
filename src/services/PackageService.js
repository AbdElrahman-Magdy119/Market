import axios from 'axios';
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
});

const PackageService = {
    getAllPackages() {
        return apiClient.get('/packages');
    },
    addPackage(packagee) {
        return apiClient.post('/packages',packagee);
    },
    getPackageByID(id) {
        return apiClient.get(`/home/packageitems/${id}`);
    },
    updatePackage(id,packagee) {
        return apiClient.post(`/packages/${id}`,packagee);
    },
    deletePackage(id) {
        return apiClient.delete(`/packages/${id}`);
    },
};


export default PackageService;
