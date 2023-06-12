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


const ReviewService = {
    getAllReviews() {
        return apiClient.get(`/review/product/3`);
    },
    deleteReview(productId) {
        return apiClient.delete(`/review/product/3`);
    },
};


export default ReviewService;
