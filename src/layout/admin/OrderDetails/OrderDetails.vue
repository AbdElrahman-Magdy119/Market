<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12 mb-3 mt-2">
                    <div class="form-container-fluid">
                        <h2>User Information</h2>
                        <form class="form">
                            <div class="form-group">
                                <label for="name" class="form-label">Name</label>
                                <input disabled type="text" id="name" :value="user.name +' ' +user.lastName" class="form-control form-input" required>
                            </div>
                            <div class="form-group">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" disabled :value="user.email" id="email" class="form-control form-input" required>
                            </div>
                            <div class="form-group">
                                <label for="phone" class="form-label">Phone</label>
                                <input disabled type="text" :value="user.phone" id="phone" class="form-control form-input" required>
                            </div>
                            <div class="form-group">
                                <label for="address" class="form-label">Shopping Address</label>
                                <input disabled type="text" id="address" :value="user.address1" class="form-control form-input" required>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="my-3 d-flex justify-content-around align-items-baseline">
                    <div>
                        <label for="status" style="font-size:20px"><strong>Status</strong></label>
                    </div>
                    <div class="field text-end">
                        <Dropdown id="status" v-model="order.status" :value="order.status" @change="saveOrder(this.order)"
                                  :options="statusOptions" optionValue="value" optionLabel="label" />
<!--                        <select class="form-input" @change="saveOrder(order)" v-model="orderStatus">-->
<!--                            <template v-for="status in statusOptions" :key="status.id" >-->
<!--                                <option v-if="status.value !== order.status" :value="status.value">-->
<!--                                        {{ status.label}}-->
<!--                                </option>-->
<!--                                <option v-else :value="order.status" selected>-->
<!--                                    {{order.status}}-->
<!--                                </option>-->
<!--                            </template>-->
<!--                        </select>-->

                    </div>

                </div>
                <div class="col-12">
                    <Toast></Toast>
                        <DataTable ref="dt" :value="orders" v-model:selection="selectedOrders" dataKey="tableId"
                                   :paginator="true" :rows="10" :filters="filters"
                                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                   :rowsPerPageOptions="[5,10,25]"
                                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords} orders">
                            <template #header>
                                <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                    <h4 class="m-0">Manage Order Details</h4>
                                    <span class="p-input-icon-left">
                          <i class="pi pi-search" />
                          <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
                                </div>
                            </template>

                            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                            <Column :field="'index'" header="#" style="width: 3rem" :exportable="false"></Column>
                            <Column field="product.name" header="Name" sortable="true" style="min-width:16rem"></Column>
                            <Column field="product.quantity" header="Quantity" sortable="true" style="min-width:16rem"></Column>
                            <Column field="product.image" header="Image" sortable="true" style="min-width:16rem">
                                <template #body="rowData">
                                   <img :src="`http://localhost:8000/`+rowData.data.product.image" alt="..."/>
                                </template>
                            </Column>

                            <Column field="product.price" header="Price" sortable="true" style="min-width:16rem"></Column>

                            <Column :exportable="false" style="min-width:8rem">
                                <template #body="slotProps">
<!--                                    <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editOrder(slotProps.data)" />-->
                                    <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteOrder(slotProps.data)" />
                                </template>
                            </Column>
                        </DataTable>

                    </div>

                    <Dialog v-model:visible="deleteOrderDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                        <div class="confirmation-content">
                            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                            <span v-if="order">Are you sure you want to delete <b>{{order.name}}</b>?</span>
                        </div>
                        <template #footer>
                            <Button label="No" icon="pi pi-times" text @click="deleteOrderDialog = false"/>
                            <Button label="Yes" icon="pi pi-check" text @click="deleteOrder" />
                        </template>
                    </Dialog>

                    <Dialog v-model:visible="deleteOrdersDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                        <div class="confirmation-content">
                            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                            <span v-if="order">Are you sure you want to delete the selected orders?</span>
                        </div>
                        <template #footer>
                            <Button label="No" icon="pi pi-times" text @click="deleteOrdersDialog = false"/>
                            <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedOrders" />
                        </template>
                    </Dialog>
                </div>
            </div>
        </div>
</template>





<script>
import * as router from 'vue-router';
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import FileUpload from "primevue/fileupload";
import Toast from "primevue/toast";
import orderService from "@/services/OrderService";
import {FilterMatchMode} from "primevue/api";
import orders from "@/layout/admin/Orders/Orders.vue";
export default({
    name: "OrderDetails",
    components: {
        Button,
        Dialog,
        InputText,
        Textarea,
        Dropdown,
        InputNumber,
        DataTable,
        Column,
        Toolbar,
        FileUpload,
        Toast
    },
    data() {
        return {
            orders: [], // Initialize as an empty array
            orderDialog: false,
            deleteOrderDialog: false,
            order: {
                address: "",
                created_at: "",
                email: "",
                firstName: "",
                id: null,
                lastName: "",
                order_items: [],
                phone: "",
                status: "",
                total_price: "",
                tracking_no: "",
                updated_at: "",
                user: {
                    address1: null,
                    address2: null,
                    created_at: "",
                    email: "",
                    email_verified_at: null,
                    id: null,
                    lastName: "",
                    name: "",
                    phone: null,
                    role_id: null,
                    updated_at: ""
                },
                user_id: null
            },
            orderId: null,
            user:{},
            orderStatus:'',
            selectedOrders: null,
            filters: {},
            submitted: false,
            deleteOrdersDialog:false,
            statusOptions: [
                { label: 'Processing', value: 'Processing', id:1 },
                { label: 'On delivery', value: 'On delivery', id:2 },
                { label: 'Delivered', value: 'Delivered', id:3 }
            ],
            id: this.$route.params.id, //this is the id from the browser
        };
    },
    created() {
        this.initFilters();
        // Add index property to each order object
        this.orders.forEach((order, index) => {
            order.index = index + 1;
        });
    },
    // mounted() {
    //     orderService.getOrderById(this.id).then((data) => {
    //         this.orders = data.data.data.order_items;
    //         this.user = data.data.data.user;
    //         this.order = data.data.data;
    //         // this.orderId = data.data.data.id;
    //         this.orderStatus = data.data.data.status;
    //         console.log("in mounted: " + this.orderStatus);
    //
    //         this.orders.forEach((order, index) => {
    //             order.index = index + 1;
    //         });
    //     });
    // },
    mounted() {
        orderService.getOrderById(this.id).then((data) => {
            this.orders = data.data.data.order_items;
            this.user = data.data.data.user;
            this.order = data.data.data;
            console.log(data.data.data);
            this.orderStatus = data.data.data.status

            this.orders.forEach((order, index) => {
                order.index = index + 1;
            });
        });
    },
    methods: {
        openNew() {
            this.order = {};
            this.submitted = false;
            this.orderDialog = true;
        },
        hideDialog() {
            this.orderDialog = false;
            this.submitted = false;
        },
        saveOrder(event) {
            this.submitted = true;
            if (this.order.status) {
                if (this.order.id) {
                    // Update existing order
                    orderService.updateOrder(this.order.id, this.order)
                        .then(() => {
                            this.orders[this.findIndexById(this.order.id)] = this.order;
                             this.order.status = event.status;
                             this.order.id = event.id;
                             this.orderStatus = event.status
                            console.log("after updating");
                            console.log(this.orderStatus);
                            this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'order Updated', life: 3000 });
                        })
                        .catch(error => {
                            console.error(error);
                            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update order', life: 3000 });
                        });
                }
                console.log("event");
                console.log(event);
                this.orderDialog = false;
                this.order = {};
                this.submitted = false;
                // this.order.status = event.status;
                // this.order.id = event.id;
                // this.order.address = event.address,
                //     this.order.created_at = event.created_at,
                //     this.order.email = event.email,
                //     this.order.firstName = event.firstName,
                //     this.order.id = event.id,
                //     this.order.lastName = event.lastName,
                //     // this.order.order_items = event.order_items,
                //     this.order.phone = event.phone,
                //     this.order.status = event.status,
                //     this.order.total_price = event.total_price,
                //     this.order.tracking_no = event.tracking_no,
                //     this.order.updated_at = event.updated_at,
                //     this.order.user.address1 = event.user.address1,
                //     this.order.user.address2 = event.user.address2,
                //     this.order.user.created_at = event.user.created_at,
                //     this.order.user.email = event.user.email,
                //     this.order.user.email_verified_at = event.user.email_verified_at,
                //     this.order.user.id = event.user.id,
                //     this.order.user.lastName = event.user.lastName,
                //     this.order.user.name = event.user.name,
                //     this.order.user.phone = event.user.phone,
                //     this.order.user.role_id = event.user.role_id,
                //     this.order.user.updated_at = event.user.updated_at,
                //     this.order.user_id = event.user_id
            }
        },
        editOrder(order) {
            this.order = { ...order };
            this.orderDialog = true;
        },
        confirmDeleteOrder(order) {
            this.order = order;
            this.deleteOrderDialog = true;
        },
        deleteOrder() {
            orderService.deleteOrder(this.order.id)
                .then(() => {
                    this.orders = this.orders.filter(val => val.id !== this.order.id);
                    this.deleteOrderDialog = false;
                    this.order = {};
                    this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'order Deleted', life: 3000 });
                })
                .catch(error => {
                    console.error(error);
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete order', life: 3000 });
                });
        },
        findIndexById(id) {
            let index = -1;
            for (let i = 0; i < this.orders.length; i++) {
                if (this.orders[i].id === id) {
                    index = i;
                    break;
                }
            }
            return index;
        },
        confirmDeleteSelected() {
            this.deleteOrdersDialog = true;
        },
        deleteSelectedOrders() {
            const orderIds = this.selectedorders.map(order => order.id);
            orderService.deleteOrders(orderIds)
                .then(() => {
                    this.orders = this.orders.filter(val => !this.selectedorders.includes(val));
                    this.deleteordersDialog = false;
                    this.selectedorders = null;
                    this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'orders Deleted', life: 3000 });
                })
                .catch(error => {
                    console.error(error);
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete orders', life: 3000 });
                });
        },
        initFilters() {
            this.filters = {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            }
        },
    }
});
</script>

<style scoped>
.form-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 4px;
}

h2 {
    margin-bottom: 10px;
}

.form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 10px;
}

.form-label {
    font-weight: bold;
}

.form-input,
.form-textarea {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-button {
    padding: 8px 16px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.form-button:hover {
    background-color: #45a049;
}

</style>
