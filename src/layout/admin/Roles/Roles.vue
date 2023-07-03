<template>
  <div>
    <Toast></Toast>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
          <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedroles || !selectedroles.length" />
        </template>


      </Toolbar>

      <DataTable ref="dt" :value="roles" v-model:selection="selectedroles" dataKey="id"
                 :paginator="true" :rows="10" :filters="filters"
                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords} roles">
        <template #header>
          <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 class="m-0">Manage roles</h4>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </span>
          </div>
        </template>

        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column :field="'index'" header="#" style="width: 3rem" :exportable="false"></Column>
        <Column field="name" header="Name" sortable style="min-width:16rem"></Column>
        <Column field="description" header="description" sortable style="min-width:16rem"></Column>

        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editrole(slotProps.data)" />
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleterole(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="roleDialog" :style="{width: '450px'}" header="role Details" :modal="true" class="p-fluid">
      <div class="field">
        <label for="name">Name</label>
        <InputText id="name" v-model.trim="role.name" required="true" autofocus :class="{'p-invalid': submitted && !role.name}" />
        <small class="p-error" v-if="submitted && !role.name">Name is required.</small>
      </div>
      <div class="field">
        <label for="description">Description</label>
        <Textarea id="description" v-model="role.description" required="true" rows="3" cols="20" />
      </div>

      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
        <Button label="Save" icon="pi pi-check" text @click="saverole" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleteroleDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="role">Are you sure you want to delete <b>{{role.name}}</b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteroleDialog = false"/>
        <Button label="Yes" icon="pi pi-check" text @click="deleterole" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleterolesDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="role">Are you sure you want to delete the selected roles?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleterolesDialog = false"/>
        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedroles" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import RoleService  from '@/services/RoleService';
import { ref, reactive } from 'vue';
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

export default {
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
      roles: [], // Initialize as an empty array
      roleDialog: false,
      deleteroleDialog: false,
      role: {},
      selectedroles: null,
      filters: {},
      submitted: false,
    }
  },
  created() {
    this.initFilters();
    // Add index property to each role object
    this.roles.forEach((role, index) => {
      role.index = index + 1; // Adding 1 to display index starting from 1
    });
  },
  mounted() {
    RoleService.getAllRoles().then((data) => {
      this.roles = data.data.data;
      // Add index property to each role object
      this.roles.forEach((role, index) => {
        role.index = index + 1; // Adding 1 to display index starting from 1
      });
    });
  },
  methods: {
    openNew() {
      this.role = {};
      this.submitted = false;
      this.roleDialog = true;
    },
    hideDialog() {
      this.roleDialog = false;
      this.submitted = false;
    },
    saverole() {
      this.submitted = true;
      if (this.role.name && this.role.description) {
        if (this.role.id) {
          // Update existing role
          RoleService.updateRole(this.role.id, this.role)
              .then(() => {
                this.roles[this.findIndexById(this.role.id)] = this.role;
                  RoleService.getAllRoles().then((data) => {
                      this.roles = data.data.data;
                      // Add index property to each role object
                      this.roles.forEach((role, index) => {
                          role.index = index + 1; // Adding 1 to display index starting from 1
                      });
                  });
                this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Role Updated', life: 3000 });
              })
              .catch(error => {
                console.error(error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update role', life: 3000 });
              });
        } else {
          // Create a new role
          RoleService.addRole(this.role)
              .then(response => {
                const newRole = response.data; // Assuming the API returns the newly created role
                this.roles.push(newRole);
                  RoleService.getAllRoles().then((data) => {
                      this.roles = data.data.data;
                      // Add index property to each role object
                      this.roles.forEach((role, index) => {
                          role.index = index + 1; // Adding 1 to display index starting from 1
                      });
                  });
                this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Role Created', life: 3000 });
              })
              .catch(error => {
                console.error(error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to create role', life: 3000 });
              });
        }

        this.roleDialog = false;
        this.role = {};
        this.submitted = false;
      }
    },
    editrole(role) {
      this.role = { ...role };
      this.roleDialog = true;
    },
    confirmDeleterole(role) {
      this.role = role;
      this.deleteroleDialog = true;
    },
    deleterole() {
      RoleService.deleteRole(this.role.id)
          .then(() => {
            this.roles = this.roles.filter(val => val.id !== this.role.id);
            this.deleteroleDialog = false;
            this.role = {};
            this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Role Deleted', life: 3000 });
          })
          .catch(error => {
            console.error(error);
            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete role', life: 3000 });
          });
    },
    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.roles.length; i++) {
        if (this.roles[i].id === id) {
          index = i;
          break;
        }
      }
      return index;
    },
    confirmDeleteSelected() {
      this.deleterolesDialog = true;
    },
    initFilters() {
      this.filters = {
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
      }
    },
  }
}
</script>
