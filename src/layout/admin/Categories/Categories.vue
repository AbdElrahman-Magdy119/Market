<template>
    <Toast></Toast>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
          <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedCategories || !selectedCategories.length" />
        </template>
      </Toolbar>

      <DataTable ref="dt" :value="categories" v-model:selection="selectedCategories" dataKey="id"
                 :paginator="true" :rows="10" :filters="filters"
                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords} categories">
        <template #header>
          <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 class="m-0">Manage Categories</h4>
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
              <img  :src="'http://localhost:8000/'+slotProps.data.image" :alt="slotProps.data.image" class="product-image"/>
          </template>        
        </Column>

        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editCategory(slotProps.data)" />
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteCategory(slotProps.data)" />
          </template>
        </Column>
      </DataTable>      
    </div>


    <Dialog v-model:visible="categoryDialog" :style="{width: '450px'}" header="category Details" :modal="true" class="p-fluid">
      
      <div class="field">
        <label for="name">Name</label>
        <InputText id="name" name="name" v-model.trim="category.name" required="true" autofocus :class="{'p-invalid': submitted && !category.name}" />
        <small class="p-error" v-if="submitted && !category.name">Name is required.</small>
      </div>

      <div class="field">
        <label for="name">Image</label>
        <input type="file" name="image"  @change="handleFileSelect"  accept="image/*" :maxFileSize="1000000"  />
      </div>

      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
        <Button label="Save" icon="pi pi-check" text @click="saveCategory" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleteCategoryDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="category">Are you sure you want to delete <b>{{category.name}}</b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteCategoryDialog = false"/>
        <Button label="Yes" icon="pi pi-check" text @click="deleteCategory" />
      </template>
    </Dialog>
</template>


<script>
import { FilterMatchMode } from 'primevue/api';
import CategoriesService  from '@/services/CategoriesService';
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
      categories: [], // Initialize as an empty array
      categoryDialog: false,
      deleteCategoryDialog: false,
      category: {},
      selectedCategories: null,
      selectedFile:null,
      filters: {},
      submitted: false,
    }
  },

  created() {
    this.initFilters();
    // Add index property to each category object
    this.categories.forEach((category, index) => {
      category.index = index + 1; // Adding 1 to display index starting from 1
    });
  },  

  mounted() {
    CategoriesService.getAllCategories().then((data) => {
      this.categories = data.data.data;

      // Add index property to each category object
      this.categories.forEach((category, index) => {
        category.index = index + 1; // Adding 1 to display index starting from 1
      });
    });
  },

  methods: {
    saveCategory() {
      this.submitted = true;
      if (this.category.name) {
        if (this.category.id) {
          const formData = new FormData();
          formData.append('name', this.category.name);
          formData.append('_method', 'put');

          if(this.selectedFile != null) {
            formData.append('image', this.selectedFile);
          }
          
          // Update existing category
          CategoriesService.updateCategory(this.category.id, formData)
              .then((response) => {
                this.categories[this.findIndexById(this.category.id)] = response.data;
                this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'category Updated', life: 3000 });
                this.category = {};
                this.selectedFile = [];
              })
              .catch(error => {
                console.error(error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update category', life: 3000 });
              });
        } else {
          // Create a new category
          const formData = new FormData();
          formData.append('image', this.selectedFile);
          formData.append('name', this.category.name);

          CategoriesService.addCategory(formData)
              .then(response => {
                const newCategory = response.data.data; // Assuming the API returns the newly created category
                this.categories.push(newCategory);
                this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'category Created', life: 3000 });
                this.category = {};
                this.selectedFile = [];
              })
              .catch(error => {
                console.error(error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to create category', life: 3000 });
              });
        }

        this.categoryDialog = false;
        this.submitted = false;
      }
    },    

    editCategory(category) {
      this.category = { ...category };
      this.categoryDialog = true;
    },

    deleteCategory()
    {
      CategoriesService.deleteCategory(this.category.id)
          .then(() => {
            this.categories = this.categories.filter(val => val.id !== this.category.id);
            this.deleteCategoryDialog = false;
            this.category = {};
            this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'category Deleted', life: 3000 });
          })
          .catch(error => {
            console.error(error);
            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete category', life: 3000 });
          });
    },    

    confirmDeleteCategory(category)
    {
      this.category = category;
      this.deleteCategoryDialog = true;
    },

    openNew() {
      this.category = {};
      this.submitted = false;
      this.categoryDialog = true;
    },
    hideDialog() {
      this.categoryDialog = false;
      this.submitted = false;
    },

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.categories.length; i++) {
          if (this.categories[i].id === id) {
            index = i;
            break;
          }
        }
        return index;
      },
  
      confirmDeleteSelected() {
        this.deleteCategoryDialog = true;
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
</style>