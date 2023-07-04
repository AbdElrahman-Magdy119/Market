<template>
  <div class="container" style="margin-top:10rem">
    <toast></toast>
    <div class="row w-100">
      <div class="col-12 w-100">
        <table class="table table-responsive">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Tracking Number</th>
              <th>Total Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(userorder, index) in UserOrders" :key="userorder.id">
              <td class="shoping__cart__price">
                {{ index + 1 }}
              </td>
              <td class="shoping__cart__price">
                {{ userorder.status }}
              </td>
              <td class="shoping__cart__price">
                {{ userorder.tracking_no }}
              </td>
              <td class="shoping__cart__price">
                {{ userorder.total_price }}
              </td>
              <td
                v-if="userorder.status === 'Processing'"
                class="shoping__cart__price"
              >
                <a
                  class="btn btn-outline-danger"
                  @click="deleteOrder(userorder.tracking_no)"
                  >Cancel</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import HomeService from "@/services/HomeService";
import Button from "primevue/button";
import usersService from "@/services/UserService";
import Toast from "primevue/toast";

export default {
  components: {
    Button,
    Toast,
  },
  data() {
    return {
      UserOrders: [], // Initialize as an empty array
    };
  },
  mounted() {
    const UserId = localStorage.getItem("id");
    HomeService.getOrderByUserId(UserId).then((data) => {
      this.UserOrders = data.data.data;
      console.log(this.UserOrders);
    });
  },
  methods: {
    deleteOrder(order_tracking_number) {
      HomeService.deleteOrder(order_tracking_number)
        .then(() => {
          this.UserOrders = this.UserOrders.filter(
            (val) => val.tracking_no !== order_tracking_number
          );
          this.deleteuserDialog = false;
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Order Deleted",
            life: 3000,
          });
          const UserId = localStorage.getItem("id");
          HomeService.getOrderByUserId(UserId).then((data) => {
            this.UserOrders = data.data.data;
            console.log(this.UserOrders);
          });
        })
        .catch((error) => {
          console.error(error);
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to delete order",
            life: 3000,
          });
        });
    },
  },
};
</script>
<style scoped>
* {
  font-size: 2rem;
}
</style>
