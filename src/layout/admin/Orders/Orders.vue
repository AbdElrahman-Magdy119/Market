<template>
    <div>
        <Toast></Toast>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
<!--                    <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />-->
<!--                    <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedOrders || !selectedOrders.length" />-->
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="orders" v-model:selection="selectedOrders" dataKey="tableId"
                       :paginator="true" :rows="10" :filters="filters"
                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                       :rowsPerPageOptions="[5,10,25]"
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} orders">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h4 class="m-0">Manage orders</h4>
                        <span class="p-input-icon-left">
                          <i class="pi pi-search" />
                          <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column :field="'index'" header="#" style="width: 3rem" :exportable="false"></Column>
                <Column field="total_price" header="Total Price" sortable="true" style="min-width:16rem"></Column>
                <Column field="status" header="Status" sortable="true" style="min-width:16rem"></Column>

                <Column header="Tracking Number">
                    <template #body="slotProps">
                        <router-link :to="`/admin/order-details/${slotProps.data.id}`">{{ slotProps.data.tracking_no }}</router-link>
                    </template>
                </Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
<!--                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editOrder(slotProps.data)" />-->
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteOrder(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>

        </div>

        <Dialog v-model:visible="orderDialog" :style="{width: '450px'}" header="order Details" :modal="true" class="p-fluid">
            <div class="field">
                <label for="status">Status</label>
                <Dropdown id="status" v-model.trim="order.status" optionValue="value" :options="statusOptions" optionLabel="label" :class="{'p-invalid': submitted && !order.status}" />
                <small class="p-error" v-if="submitted && !order.status">Status is required.</small>
            </div>


            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" text @click="saveOrder" />
            </template>
        </Dialog>

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
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import orderService  from '@/services/OrderService';
import  Button  from 'primevue/button';
import  Dialog  from 'primevue/dialog';
import  InputText  from 'primevue/inputtext';
import  Textarea  from 'primevue/textarea';
import  Dropdown  from 'primevue/dropdown';
import  InputNumber  from 'primevue/inputnumber';
import  DataTable from 'primevue/datatable';
import  Toolbar  from 'primevue/toolbar';
import  FileUpload  from 'primevue/fileupload';
import  Column  from 'primevue/column';
import  Toast  from 'primevue/toast';
import orderDetails from "@/layout/admin/OrderDetails/OrderDetails.vue";

export default {
    name:"orders",
    // computed: {
    //     orderDetails() {
    //         return orderDetails
    //     }
    // },
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
            order: {},
            selectedOrders: null,
            filters: {},
            submitted: false,
            deleteOrdersDialog:false,
            statusOptions: [
                { label: 'Processing', value: 'Processing' },
                { label: 'On delivery', value: 'On delivery' },
                { label: 'Delivered', value: 'Delivered' }
            ]
        }
    },
    created() {
        this.initFilters();
        // Add index property to each order object
        this.orders.forEach((order, index) => {
            order.index = index + 1; // Adding 1 to display index starting from 1
        });
    },
    mounted() {
        orderService.getAllOrders().then((data) => {
            console.log(data.data.data)
            this.orders = data.data.data;

            // Add index property to each order object
            this.orders.forEach((order, index) => {
                order.index = index + 1; // Adding 1 to display index starting from 1
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
        saveOrder() {
            this.submitted = true;
            if (this.order.status) {
                if (this.order.id) {
                    // Update existing order
                    orderService.updateOrder(this.order.id, this.order)
                        .then(() => {
                            this.orders[this.findIndexById(this.order.id)] = this.order;
                            this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Order Updated', life: 3000 });
                        })
                        .catch(error => {
                            console.error(error);
                            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed To Update Order', life: 3000 });
                        });
                }

                this.orderDialog = false;
                this.order = {};
                this.submitted = false;
            }
        },
        editOrder(order) {
            this.order = { ...order };
            this.orderDialog = true;
            orderService.getAllOrders().then((data) => {
                console.log("in update");
                console.log(data.data.data)
                this.orders = data.data.data;

                // Add index property to each order object
                this.orders.forEach((order, index) => {
                    order.index = index + 1; // Adding 1 to display index starting from 1
                });
            });
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
                    this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Order Deleted', life: 3000 });
                })
                .catch(error => {
                    console.error(error);
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed To Delete Order', life: 3000 });
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
                    this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Orders Deleted', life: 3000 });
                })
                .catch(error => {
                    console.error(error);
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed To Delete Orders', life: 3000 });
                });
        },
        initFilters() {
            this.filters = {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            }
        },
    }
}
</script>
