<template>
    <div class="card">
        <div class="left-side">
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Image</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in cardContent" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.price }}</td>
                    <td><img :src="item.image" alt="Product Image" /></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="right-side">
            <form>
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" :value="customerDetails.name" disabled />
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" :value="customerDetails.email" disabled />
                </div>
                <!-- Add more customer details fields as needed -->
            </form>
        </div>
    </div>
</template>





<script>
import {defineComponent} from 'vue'

export default defineComponent ({
    name: "OrderDetails",

    data() {
        return {
            cardContent: [
                {
                    id: 1,
                    name: 'Product 1',
                    quantity: 3,
                    price: 10.99,
                    image: 'product1.jpg',
                },
                // Add more card content items as needed
            ],
            customerDetails: {
                name: 'John Doe',
                email: 'john@example.com',
                // Add more customer details as needed
            },
        };
    },
});
</script>

<style scoped>
.card {
    display: flex;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.left-side {
    flex: 1;
    padding: 10px;
}

.right-side {
    flex: 1;
    padding: 10px;
    background-color: #f5f5f5;
}

table {
    width: 100%;
}

th,
td {
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

img {
    width: 50px;
    height: 50px;
    object-fit: cover;
}

form div {
    margin-bottom: 10px;
}

label {
    display: inline-block;
    width: 80px;
}
</style>
