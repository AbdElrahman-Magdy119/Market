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
      <DataTable v-if="!noPackagesAvailable" ref="dt" :value="packages" v-model:selection="selectedpackages" dataKey="id"
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
        <Column field="image" header="Image" :exportable="false">
          <template #body="slotProps">
            <img v-if="slotProps.data.image" :src="`http://localhost:8000/`+slotProps.data.image" alt="Package Image" style="width: 50px; height: 50px; object-fit: cover;" />
          </template>
        </Column>
        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editpackage(slotProps.data)" />
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeletepackage(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
      <p v-else class="text-center fw-bold fs-5">No packages available.</p>
    </div>

    <Dialog v-model:visible="packageDialog" :style="{width: '450px'}" header="Package Details" :modal="true" class="p-fluid">
      <div class="field">
        <label for="name">Name</label>
        <InputText id="name" v-model.trim="package.name" required="true" autofocus :class="{'p-invalid': submitted && !package.name}" />
        <small class="p-error" v-if="submitted && !package.name">Name is required.</small>
      </div>
      <div class="field">
        <label for="total_price">Total Price</label>
        <input :readonly="true" v-model.trim="package.total_price"  />
      </div>
      <div class="field">
        <label for="discount">Discount (%)</label>
        <input type="number" v-model="package.discount"  @input="calculateDiscount" />
      </div>
      <div class="field">
        <label for="image">Image</label>
        <input type="file" name="image" @change="handleFileSelect" accept="image/*" :maxFileSize="1000000" />
      </div>
      <div class="field">
        <label for="package_items">Package Items</label>
        <div v-for="(item, index) in package.package_items" :key="index" class="p-field">
          <div class="p-grid">
            <div class="p-col-4">
              <Dropdown
                  :options="productOptions.value"
                  v-model="item.product_id"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select a product"
                  @change="updateProductData(product)"
              />
            </div>
            <div class="p-col-4">
              <div class="quantity-control">
                <button class="decrement" @click="decrementQuantity(item)">-</button>
                <input type="number" v-model="item.quantity" :readonly="true" />
                <button class="increment" @click="incrementQuantity(item)">+</button>
              </div>
            </div>
            <!--            <div class="p-col-4">-->
            <!--              <div>{{ calculateItemPrice(item) }}</div>-->
            <!--            </div>-->
            <input type="number" :readonly="true"  v-model.trim="item.price" />
          </div>
        </div>
        <Button icon="pi pi-plus" label="Add Item" @click="addPackageItem" />
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" text @click="savepackage" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deletePackageDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="package">Are you sure you want to delete <b>{{package.name}}</b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deletePackageDialog = false"/>
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
import {FilterMatchMode} from 'primevue/api';
import PackageService from '@/services/PackageService';
import ProductService from '@/services/ProductsService';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import DataTable from 'primevue/datatable';
import Toolbar from 'primevue/toolbar';
import FileUpload from 'primevue/fileupload';
import Column from 'primevue/column';
import Toast from 'primevue/toast';
import product from "@/layout/user/shop/product.vue";

export default {
  computed: {
    product() {
      return product
    }
  },
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
      packages: [],
      packageDialog: false,
      deletePackageDialog: false,
      package: {
        name: '',
        total_price: 0,
        image: null,
        package_items: [],
        discount: 0,
      },
      selectedPackages: null,
      filters: {},
      submitted: false,
      productOptions: [],
      noPackagesAvailable: false,
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
  async mounted() {
    try {
      const response = await ProductService.getAllProducts();
      this.productOptions.value = response.data.data.map((product) => ({
        label: product.name,
        value: product.id,
        price: product.price,
        quantity: product.quantity
      }));
      this.packages = (await PackageService.getAllPackages()).data;
    } catch (error) {
      this.noPackagesAvailable = true; // Set the flag to indicate no packages are available
    }
  },
  methods: {
    calculateDiscount() {
      const total = this.calculateTotalPrice();
      const discount = parseFloat(this.package.discount);
      if (isNaN(discount) || discount < 0) {
        this.package.total_price = total;
      } else {
        const discountAmount = total * (discount / 100);
        this.package.total_price = total - discountAmount;
      }
    },
    updateProductData(prod){
      console.log(prod)
    },
    handleFileSelect(event) {
      if (event.target.files.length > 0) {
        this.package.image = event.target.files[0];
      }
    },
    calculatePrice(item) {
      console.log(item);
      const selectedProduct = this.productOptions.value.find(product => product.value === item.product_id);
      console.log('selected',selectedProduct);
      if (selectedProduct) {
        item.price = Number(selectedProduct.price) * Number(item.quantity);
      }
      this.calculateTotalPrice();
    },
    calculateTotalPrice() {
      let total = 0;
      this.package.package_items.forEach(item => {
        total += Number(item.price);
      });
      return total;
    },
    incrementQuantity(item) {
      item.quantity++;
      this.calculatePrice(item);
    },
    decrementQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.calculatePrice(item);
      }
    },
    addPackageItem() {
      if (!this.package.package_items) {
        this.package.package_items = [];
      }
      this.package.package_items.push({
        product_id: null,
        quantity: 1,
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
      if (this.package.name && this.package.total_price && this.package.image) {
        const formData = new FormData();
        formData.append('name', this.package.name);
        formData.append('total_price', this.package.total_price);
        formData.append('image', this.package.image, this.package.image.name); // Append the image file to the form data
        this.package.package_items.forEach((item, index) => {
          formData.append(`package_items[${index}][product_id]`, item.product_id);
          formData.append(`package_items[${index}][quantity]`, item.quantity);
          formData.append(`package_items[${index}][price]`, item.price);
        });
        if (this.package.id) {
          // Update existing package
          PackageService.updatePackage(this.package.id, formData)
              .then(() => {
                this.packages[this.findIndexById(this.package.id)] = this.package;
                this.$toast.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Package Updated',
                  life: 3000
                });
              })
              .catch(error => {
                console.error(error);
                this.$toast.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Failed to update package',
                  life: 3000
                });
              });
        } else {
          // Create a new package
          PackageService.addPackage(formData)
              .then(response => {
                const newPackage = response.data; // Assuming the API returns the newly created package
                this.packages.push(newPackage);
                this.$toast.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Package Created',
                  life: 3000
                });
              })
              .catch(error => {
                console.error(error);
                this.$toast.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Failed to create package',
                  life: 3000
                });
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
      this.deletePackageDialog = true;
    },
    deletepackage() {
      PackageService.deletePackage(this.package.id)
          .then(() => {
            this.packages = this.packages.filter(val => val.id !== this.package.id);
            this.deletePackageDialog = false;
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
