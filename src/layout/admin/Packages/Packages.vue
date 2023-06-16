<template>
  <div>
    <Toast></Toast>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
          <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedpackages || !selectedpackages.length" />
        </template>
      </Toolbar>
      <DataTable ref="dt" :value="packages" v-model:selection="selectedpackages" dataKey="id"
                 :paginator="true" :rows="10" :filters="filters"
                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords} packages">
        <template #header>
          <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 class="m-0">Manage packages</h4>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </span>
          </div>
        </template>

        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column :field="'index'" header="#" style="width: 3rem" :exportable="false"></Column>
        <Column field="name" header="Name" sortable style="min-width:16rem"></Column>
        <Column field="total_price" header="total price" sortable style="min-width:16rem"></Column>

        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editpackage(slotProps.data)" />
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeletepackage(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="packageDialog" :style="{width: '450px'}" header="package Details" :modal="true" class="p-fluid">
      <div class="field">
        <label for="name">Name</label>
        <InputText id="name" v-model.trim="package.name" required="true" autofocus :class="{'p-invalid': submitted && !package.name}" />
        <small class="p-error" v-if="submitted && !package.name">Name is required.</small>
      </div>
      <div class="field">
        <label for="total_price">total_price</label>
        <InputText id="total_price" v-model="package.total_price" required="true" />
      </div>
      <div class="field">
        <label for="package_items">Package Items</label>
        <div v-for="(item, index) in package.package_items" :key="index" class="p-field">
          <div class="p-grid">
            <div class="p-col-4">
              <Dropdown
                  :options="productOptions"
                  v-model="item.product_id"
                  optionLabel="name"
                  placeholder="Select a product"
              />
            </div>
            <div class="p-col-4">
              <InputNumber v-model="item.quantity" :min="1" mode="decimal" :step="0.01" placeholder="Quantity" />
            </div>
            <div class="p-col-4">
              <InputNumber v-model="item.price" :min="0" mode="decimal" :step="0.01" placeholder="Price" />
            </div>
          </div>
        </div>
        <Button icon="pi pi-plus" label="Add Item" @click="addPackageItem" />
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
        <Button label="Save" icon="pi pi-check" text @click="savepackage" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deletepackageDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="package">Are you sure you want to delete <b>{{package.name}}</b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deletepackageDialog = false"/>
        <Button label="Yes" icon="pi pi-check" text @click="deletepackage" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deletepackagesDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="package">Are you sure you want to delete the selected packages?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deletepackagesDialog = false"/>
        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedpackages" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import PackageService  from '@/services/PackageService';
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
      packages: [], // Initialize packages as an empty array
      packageDialog: false,
      deletepackageDialog: false,
      package: {},
      selectedpackages: null,
      filters: {},
      submitted: false,
      productOptions: [], // Holds the available product options
    }
  },
  created() {
    this.initFilters();
    // Add index property to each package object
    if (this.packages && this.packages.length > 0) {
      this.packages.forEach((pkg, index) => {
        pkg.index = index + 1;
      });
    }
  },
  mounted() {
  //   ProductService.getAllProducts().then((data) => {
  //     this.productOptions = data.data.map((product) => ({
  //       label: product.name,
  //       value: product.id,
  //     }));
  //   });
  // },
    PackageService.getAllPackages().then((data) => {
      this.packages = data.data;
      console.log(data.data)
      // Add index property to each package object
      if (this.packages && this.packages.length > 0) {
        this.packages.forEach((pkg, index) => {
          pkg.index = index + 1;
        });
      }
    });
  },
  methods: {
    addPackageItem() {
      this.package.package_items.push({
        product_id: null,
        quantity: null,
        price: null,
      });
    },
    openNew() {
      this.package = {};
      this.submitted = false;
      this.packageDialog = true;
    },
    hideDialog() {
      this.packageDialog = false;
      this.submitted = false;
    },
    savepackage() {
      this.submitted = true;
      if (this.package.name && this.package.total_price) {
        if (this.package.id) {
          // Update existing package
          PackageService.updatePackage(this.package.id, this.package)
              .then(() => {
                this.packages[this.findIndexById(this.package.id)] = this.package;
                this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'package Updated', life: 3000 });
              })
              .catch(error => {
                console.error(error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update package', life: 3000 });
              });
        } else {
          // Create a new package
          PackageService.addPackage(this.package)
              .then(response => {
                const newpackage = response.data; // Assuming the API returns the newly created package
                this.packages.push(newpackage);
                this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'package Created', life: 3000 });
              })
              .catch(error => {
                console.error(error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to create package', life: 3000 });
              });
        }

        this.packageDialog = false;
        this.package = {};
        this.submitted = false;
      }
    },
    editpackage(pkg) {
      this.package = { ...pkg };
      this.packageDialog = true;
    },
    confirmDeletepackage(pkg) {
      this.package = pkg;
      this.deletepackageDialog = true;
    },
    deletepackage() {
      PackageService.deletePackage(this.package.id)
          .then(() => {
            this.packages = this.packages.filter(val => val.id !== this.package.id);
            this.deletepackageDialog = false;
            this.package = {};
            this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'package Deleted', life: 3000 });
          })
          .catch(error => {
            console.error(error);
            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete package', life: 3000 });
          });
    },
    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.packages.length; i++) {
        if (this.packages[i].id === id) {
          index = i;
          break;
        }
      }
      return index;
    },
    confirmDeleteSelected() {
      this.deletepackagesDialog = true;
    },
    initFilters() {
      this.filters = {
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
      }
    },
  }
}
</script>
