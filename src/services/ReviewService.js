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
    getAllProducts() {
        return apiClient.get(`/home/products`);
    },
    getAllReviews(prdId) {
        return apiClient.get(`/review/product/${prdId}`); // patch review   and add /review +  puductid + اي حاجه 
    },
    deleteReview(prdId) {
        return apiClient.delete(`/review/product/${prdId}`);
    },
    addReview(review) {
        return apiClient.post('/review',review);
    },
    updateReview(review,prdId) {
        return apiClient.post(`/review/product/${prdId}`,review);
    },
    deleteReview(review,prdId) {
        return apiClient.delete(`/review/product/4`,{
            user_id:3,
        });
    },

};


export default ReviewService;
