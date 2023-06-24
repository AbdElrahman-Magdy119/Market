<template>
    <Toast></Toast>

    <div class="card">
        <Toolbar class="mb-4">
            <template #start>
                <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedusers || !selectedusers.length" />
            </template>
        </Toolbar>

        <DataTable ref="dt" :value="users" v-model:selection="selectedusers" dataKey="id"
                   :paginator="true" :rows="10" :filters="filters"
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users">
            <template #header>
                <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                    <h4 class="m-0">Manage users</h4>
                    <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </span>
                </div>
            </template>

            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <Column :field="'index'" header="#" style="width: 3rem" :exportable="false"></Column>
            <Column field="name" header="First Name" sortable style="min-width:16rem"></Column>
            <Column field="lastName" header="Last Name" sortable style="min-width:16rem"></Column>
            <Column field="email" header="E-mail" sortable style="min-width:16rem"></Column>
            <Column field="address1" header="Address 1" sortable style="min-width:16rem"></Column>
            <Column field="address2" header="Address 2" sortable style="min-width:16rem"></Column>
            <Column field="phone" header="Phone Number" sortable style="min-width:16rem"></Column>
            <Column field="role_id.name" header="Role" sortable style="min-width:16rem"></Column>
            <Column :exportable="false" style="min-width:8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="edituser(slotProps.data)" />
                    <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteuser(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>

    <Dialog v-model:visible="userDialog" :style="{width: '450px'}" header="user Details" :modal="true" class="p-fluid">

        <div class="field">
            <label for="name">First Name</label>
            <InputText id="name" v-model.trim="user.name" required="true" autofocus :class="{'p-invalid': submitted && !user.name}" />
            <small class="p-error" v-if="submitted && !user.name">Name is required.</small>
        </div>

        <div class="field">
            <label for="lastName">Last Name</label>
            <Textarea id="lastName" v-model="user.lastName" required="true" rows="3" cols="20" />
        </div>

        <div class="field">
            <label for="role_id">Role</label>
            <Dropdown id="role_id" v-model="selectedCate" :options="roles" optionLabel="name"
                      option-value="id" placeholder="Select a Role" @change="saveuser($event)"
                      class="w-full md:w-14rem" :class="{'p-invalid': submitted && !user.role_id}" />
            <small class="p-error" v-if="submitted && !user.role_id">Role is required.</small>
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
            <Button label="Save" icon="pi pi-check" text @click="saveuser" />
        </template>
    </Dialog>

    <Dialog v-model:visible="deleteuserDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="user">Are you sure you want to delete <b>{{user.name}}</b>?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteuserDialog = false"/>
            <Button label="Yes" icon="pi pi-check" text @click="deleteuser" />
        </template>
    </Dialog>
</template>


<script>
import { FilterMatchMode } from 'primevue/api';
import usersService  from '@/services/UserService';
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
import InputSwitch from 'primevue/inputswitch';
import RoleService from "@/services/RoleService";

export default {
    name:"Users",
    components: {
        Button,
        Dialog,
        InputText,
        InputSwitch,
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
            users: [], // Initialize as an empty array
            userDialog: false,
            deleteuserDialog: false,
            user: {},
            selectedusers: null,
            selectedFile:[],
            selectedCate:null,
            isTrend:null,
            filters: {},
            submitted: false,
        }
    },

    created() {
        this.initFilters();
        // Add index property to each user object
        this.users.forEach((user, index) => {
            user.index = index + 1; // Adding 1 to display index starting from 1
        });
    },

    mounted() {
        usersService.getAllUsers().then((data) => {
            this.users = data.data.users;
            console.log(this.users)
            // Add index property to each user object
            this.users.forEach((user, index) => {
                user.index = index + 1; // Adding 1 to display index starting from 1
            });
        });

        RoleService.getAllRoles().then((data) => {
            this.roles = data.data.data;
        });
    },

    methods: {
        saveuser(event) {
            // console.log("User id: "+this.user.id + " role number: " + event.value);
            this.submitted = true;
            if (this.user.name) {
                if (this.user.id) {
                    // Update existing user
                    const updated_user = {
                        role_id:event.value,
                    }
                    usersService.updateUser(this.user.id, updated_user)
                        .then(() => {
                            this.users[this.findIndexById(this.user.id)] = this.user;
                            this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Role Updated', life: 3000 });
                            usersService.getAllUsers().then((data) => {
                                this.users = data.data.users;
                                console.log(this.users)

                                this.users.forEach((user, index) => {
                                    user.index = index + 1; // Adding 1 to display index starting from 1
                                });
                            });
                        })
                        .catch(error => {
                            console.error(error);
                            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update Role', life: 3000 });
                        });
                } else {
                    // Create a new user
                    const formData = new FormData();
                    formData.append('image', this.selectedFile);
                    formData.append('name', this.user.name);
                    formData.append('description', this.user.description);
                    formData.append('price', this.user.price);
                    formData.append('quantity', this.user.quantity);
                    formData.append('discount', this.user.discount);
                    formData.append('subcategory_id', this.selectedCate);
                    formData.append('trend', 1);

                    usersService.adduser(formData)
                        .then(response => {
                            const newuser = response.data.data; // Assuming the API returns the newly created user
                            this.users.push(newuser);
                            this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'category Created', life: 3000 });
                            this.user = {};
                            this.selectedFile = [];

                        })
                        .catch(error => {
                            console.error(error);
                            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to create user', life: 3000 });
                        });
                }

                this.userDialog = false;
                this.submitted = false;
            }
        },
        edituser(user) {
            this.user = { ...user };
            this.userDialog = true;
        },
        deleteuser()
        {
            usersService.deleteuser(this.user.id)
                .then(() => {
                    this.users = this.users.filter(val => val.id !== this.user.id);
                    this.deleteuserDialog = false;
                    this.user = {};
                    this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'user Deleted', life: 3000 });
                })
                .catch(error => {
                    console.error(error);
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete user', life: 3000 });
                });
        },

        confirmDeleteuser(user)
        {
            this.user = user;
            this.deleteuserDialog = true;
        },

        openNew() {
            this.user = {};
            this.submitted = false;
            this.userDialog = true;
        },
        hideDialog() {
            this.userDialog = false;
            this.submitted = false;
        },

        findIndexById(id) {
            let index = -1;
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id === id) {
                    index = i;
                    break;
                }
            }
            return index;
        },

        confirmDeleteSelected() {
            this.deleteuserDialog = true;
        },

        initFilters() {
            this.filters = {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            }
        },
        handleFileSelect(event) {
            if (event.target.files.length >= 0) {
                this.selectedFile = event.target.files[0];
            }
        }
    }

}
</script>