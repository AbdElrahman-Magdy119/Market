<template>
    <Toast></Toast>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
          <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
        </template>
      </Toolbar>

      <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id"
                 :paginator="true" :rows="10" :filters="filters"
                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
        <template #header>
          <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 class="m-0">Manage products</h4>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </span>
          </div>
        </template>

        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column :field="'index'" header="#" style="width: 3rem" :exportable="false"></Column>
        <Column field="name" header="Name" sortable style="min-width:16rem"></Column>
        <Column field="image" header="Image" sortable style="min-width:16rem">
          <template #body="slotProps">
              <img width="50" height="50" :src="'http://localhost:8000/'+slotProps.data.image" :alt="slotProps.data.image"/>
          </template>        
        </Column>
        <Column field="description" header="Description" sortable style="min-width:16rem"></Column>
        <Column field="price" header="Price" sortable style="min-width:16rem"></Column>
        <Column field="quantity" header="Quantity" sortable style="min-width:16rem"></Column>
        <Column field="discount" header="Discount" sortable style="min-width:16rem"></Column>
        <Column field="subcategory.name" header="Subcategory_id" sortable style="min-width:16rem"></Column>
          <Column field="trend" header="Trend" sortable style="min-width: 16rem">
              <template #body="slotProps">
                  <span>{{ slotProps.data.trend === 1 ? 'Yes' : 'No' }}</span>
              </template>
          </Column>
          <Column header="Reviews">
              <template #body="slotProps">
                  <router-link :to="`/admin/reviews/product/${slotProps.data.id}`">Reviews</router-link>
              </template>
          </Column>



        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
          </template>
        </Column>
      </DataTable>      
    </div>


    <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="product Details" :modal="true" class="p-fluid">
      <div class="field">
        <label for="name">Name</label>
        <InputText id="name" v-model.trim="product.name" required="true" autofocus :class="{'p-invalid': submitted && !product.name}" />
        <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
      </div>

      <div class="field">
        <label for="description">Description</label>
        <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
      </div>

      <div class="field">
        <label for="price">Price</label>
        <InputNumber id="price" v-model.trim="product.price" showButtons required="true" autofocus :class="{'p-invalid': submitted && !product.price}" />
        <small class="p-error" v-if="submitted && !product.price">Price is required.</small>
      </div>      

      <div class="field">
        <label for="quantity">Quantity</label>
        <InputNumber id="quantity" v-model.trim="product.quantity" showButtons required="true"  :min="0" autofocus :class="{'p-invalid': submitted && !product.quantity}" />
        <small class="p-error" v-if="submitted && !product.quantity">Quantity is required.</small>
      </div>       

      <div class="field">
        <label for="discount">Discount</label>
        <InputNumber id="discount" v-model.trim="product.discount" showButtons required="true" :min="0" :max="100" autofocus />
      </div>

      <div class="field">
        <label for="category">Category</label>
        <Dropdown id="category" v-model="selectedCate" :options="categories" optionLabel="name" option-value="id" placeholder="Select a Category" class="w-full md:w-14rem" :class="{'p-invalid': submitted && !selectedCate}" />
        <small class="p-error" v-if="submitted && !selectedCate">Category is required.</small>
      </div>

      <div class="field">
        <label for="trend" class="form-label">Trend</label>
        <InputSwitch id="trend" v-model="isTrend" />
      </div>


      <div class="field">
        <label for="image" class="form-label">Image</label>
        <input class="form-control" type="file"  name="image"  @change="handleFileSelect"  accept="image/*" :maxFileSize="1000000"  />
      </div>      
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
        <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="product">Are you sure you want to delete <b>{{product.name}}</b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false"/>
        <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
      </template>
    </Dialog>
</template>


<script>
import { FilterMatchMode } from 'primevue/api';
import ProductsService  from '@/services/ProductsService';
import SubCategoriesService  from '@/services/SubCategoriesService';
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

export default {
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
      products: [], // Initialize as an empty array
      categories: [],
      productDialog: false,
      deleteProductDialog: false,
      product: {},
      selectedProducts: null,
      selectedFile:null,
      selectedCate:null,
      isTrend:null,
      filters: {},
      submitted: false,
    }
  },

  created() {
    this.initFilters();
    // Add index property to each product object
    this.products.forEach((product, index) => {
      product.index = index + 1; // Adding 1 to display index starting from 1
    });
  },  

  mounted() {
    ProductsService.getAllProducts().then((data) => {
      this.products = data.data.data;
        console.log(this.products);
      // for (const i in this.products){
      //     if(this.products[i].trend == 1){
      //         this.products[i].trend = 'Yes'
      //     }else{
      //         this.products[i].trend = 'No'
      //     }
      // }

      // Add index property to each Product object
      this.products.forEach((Product, index) => {
        Product.index = index + 1; // Adding 1 to display index starting from 1
      });
    });

    SubCategoriesService.getAllSubCategories().then((data) => {
      this.categories = data.data.data;
    });    
  },

  methods: {
    saveProduct() {
      this.submitted = true;
      if (!this.product.name || !this.product.description || !this.product.price || !this.product.quantity || !this.selectedCate) {
        return;
      }
        if (this.product.id) {
          const formData = new FormData();
          formData.append('name', this.product.name);
          formData.append('description', this.product.description);
          formData.append('price', Number(this.product.price));
          formData.append('quantity', this.product.quantity);
          formData.append('discount', this.product.discount);
          formData.append('subcategory_id', Number(this.selectedCate));
          formData.append('trend', this.isTrend ? 1 : 0);
          formData.append('_method', 'put');
          if (this.product.image && this.selectedFile.length > 0) {
              formData.append('image', this.product.image);
          }else {
              formData.append('image', this.selectedFile);
          }

          // Update existing product
          ProductsService.updateProduct(this.product.id, formData)
              .then((response) => {
                this.products[this.findIndexById(this.product.id)] = response.data;
                  ProductsService.getAllProducts().then((data) => {
                      this.products = data.data.data;
                      // Add index property to each Product object
                      this.products.forEach((Product, index) => {
                          Product.index = index + 1; // Adding 1 to display index starting from 1
                      });
                  });
                this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                this.product = {};
                this.selectedFile = [];
              
              })
              .catch(error => {
                console.error(error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update product', life: 3000 });
              });
        } else {
          // Create a new product
          const formData = new FormData();
          formData.append('image', this.selectedFile);
          formData.append('name', this.product.name);
          formData.append('description', this.product.description);
          formData.append('price', this.product.price);
          formData.append('quantity', this.product.quantity);
          formData.append('discount', this.product.discount === '' ? 0 : this.product.discount);
          formData.append('subcategory_id', this.selectedCate);
          formData.append('trend', this.isTrend ? 1 : 0);

          ProductsService.addProduct(formData)
              .then(response => {
                const newProduct = response.data; // Assuming the API returns the newly created product
                this.products.push(newProduct);
                  ProductsService.getAllProducts().then((data) => {
                      this.products = data.data.data;
                      // Add index property to each Product object
                      this.products.forEach((Product, index) => {
                          Product.index = index + 1; // Adding 1 to display index starting from 1
                      });
                  });
                this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                this.product = {};
                this.selectedFile = [];
              })
              .catch(error => {
                console.error(error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to create product', life: 3000 });
              });
        }
        this.productDialog = false;
        this.submitted = false;
    },
      editProduct(product) {
          this.product = { ...product };
          this.selectedCate = this.product.subcategory_id; // Set the selectedCate to the subcategory ID
          this.isTrend = Boolean(this.product.trend); // Set the selectedCate to the subcategory ID
          this.productDialog = true;
      },
    deleteProduct()
    {
      ProductsService.deleteProduct(this.product.id)
          .then(() => {
            this.products = this.products.filter(val => val.id !== this.product.id);
            this.deleteProductDialog = false;
            this.product = {};
              ProductsService.getAllProducts().then((data) => {
                  this.products = data.data.data;
                  // Add index property to each Product object
                  this.products.forEach((Product, index) => {
                      Product.index = index + 1; // Adding 1 to display index starting from 1
                  });
              });
            this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
          })
          .catch(error => {
            console.error(error);
            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete Product', life: 3000 });
          });
    },    

    confirmDeleteProduct(Product)
    {
      this.product = Product;
      this.deleteProductDialog = true;
    },

    openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
    },
    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    },

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
            index = i;
            break;
          }
        }
        return index;
      },
  
      confirmDeleteSelected() {
        this.deleteProductDialog = true;
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

<style>
.product-image
{
  width: 175px;
  height: 175px;
  border-radius: 8px;
}

.field
{
  margin-bottom: 15px;
}

.p-inputswitch
{
  top: 7px;
  left: 5px;
}
</style>