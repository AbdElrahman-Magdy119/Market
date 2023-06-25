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

const WishListService = {
  getWishlist() {
      return apiClient.get("/wishlist");
  },
  addToWishList(product) {
    return apiClient.post("/wishlist", product);
  },
  // updateRole(id,role) {
  //     return apiClient.put(`/roles/${id}`,role);
  // },
  deleteProduct(id) {
      return apiClient.delete(`/wishlist/${id}`);
  },
};


export default WishListService;