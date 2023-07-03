<template>
    <Toast></Toast>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
          <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedSubCategories || !selectedSubCategories.length" />
        </template>
      </Toolbar>

      <DataTable ref="dt" :value="subCategories" v-model:selection="selectedSubCategories" dataKey="id"
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
        <Column field="category_id" header="Category Id" sortable style="min-width:16rem"></Column>
        <Column field="image" header="Image" sortable style="min-width:16rem">
          <template #body="{data}">
              <img width="50" height="50" :src="'http://localhost:8000/'+data.image" :alt="data.image"/>
          </template>        
        </Column>
        
        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editSubCategory(slotProps.data)" />
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteCategory(slotProps.data)" />
          </template>
        </Column>
      </DataTable>      
    </div>


    <Dialog v-model:visible="subCategoryDialog" :style="{width: '450px'}" header="subCategory Details" :modal="true" class="p-fluid">
      
      <div class="field">
        <label for="name">Name</label>
        <InputText id="name" name="name" v-model.trim="subCategory.name" required="true" autofocus :class="{'p-invalid': submitted && !subCategory.name}" />
        <small class="p-error" v-if="submitted && !subCategory.name">Name is required.</small>
      </div>

      <div class="field ">
        <label for="image" class="col-form-label">Image</label>
        <input class="form-control" type="file" name="image" id="image"  @change="handleFileSelect"  accept="image/*" :maxFileSize="1000000"  />
        <small class="p-error" v-if="submitted && !subCategory.name">Name is required.</small>
      </div>
      <Dropdown v-model="subCategory.category_id" :options="categories" optionLabel="name"  option-value="id" placeholder="Select a Category" class="w-full md:w-14rem" />
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
        <Button label="Save" icon="pi pi-check" text @click="saveSubCategory" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleteSubCategoryDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="subCategory">Are you sure you want to delete <b>{{subCategory.name}}</b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteSubCategoryDialog = false"/>
        <Button label="Yes" icon="pi pi-check" text @click="deleteSubCategory" />
      </template>
    </Dialog>
</template>


<script>
import { FilterMatchMode } from 'primevue/api';
import SubCategoriesService  from '@/services/SubCategoriesService';
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
        categories: [],
        subCategories: [], // Initialize as an empty array
        subCategoryDialog: false,
        deleteSubCategoryDialog: false,
        subCategory: {},
        selectedSubCategories: null,
        selectedFile:null,
        filters: {},
        submitted: false,
    }
  },

  created() {
    this.initFilters();
    // Add index property to each subCategory object
    this.subCategories.forEach((subCategory, index) => {
      subCategory.index = index + 1; // Adding 1 to display index starting from 1
    });
  },  

  mounted() {
    SubCategoriesService.getAllSubCategories().then((data) => {
      this.subCategories = data.data.data;

      // Add index property to each subCategory object
      this.subCategories.forEach((subCategory, index) => {
        subCategory.index = index + 1; // Adding 1 to display index starting from 1
      });
    });

    CategoriesService.getAllCategories().then((data) => {
      this.categories = data.data.data;
    });
  },

  methods: {

    saveSubCategory() {
      this.submitted = true;
      if (this.subCategory.name) {
        if (this.subCategory.id) {
          const formData = new FormData();
          
          formData.append('name', this.subCategory.name);
          formData.append('category_id', this.subCategory.category_id);
          formData.append('_method', 'put');

          if(this.selectedFile != null) {
            formData.append('image', this.selectedFile);
          }

          // Update existing subCategory
          SubCategoriesService.updateSubCategory(this.subCategory.id, formData)
              .then((response) => {
                this.subCategories[this.findIndexById(this.subCategory.id)] = response.data;
                this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'category Updated', life: 3000 });
                this.subCategory = {};
                this.selectedFile = [];
              })
              .catch(error => {
                console.error(error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update subCategory', life: 3000 });
              });
        } else {
          // Create a new subCategory
          const formData = new FormData();
          formData.append('image', this.selectedFile);
          formData.append('name', this.subCategory.name);
          formData.append('category_id', this.subCategory.category_id);

          SubCategoriesService.addSubCategory(formData)
              .then(response => {
                const newCategory = response.data.data; // Assuming the API returns the newly created subCategory
                this.subCategories.push(newCategory);
                this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'category Created', life: 3000 });
                this.subCategory = {};
                this.selectedFile = [];
              })
              .catch(error => {
                console.error(error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to create subCategory', life: 3000 });
              });
        }

        this.subCategoryDialog = false;
        this.submitted = false;
      }
    },    

    editSubCategory(subCategory) {
      this.subCategory = { ...subCategory };
      this.subCategoryDialog = true;
    },

    deleteSubCategory()
    {
      SubCategoriesService.deleteSubCategory(this.subCategory.id)
          .then(() => {
            this.subCategories = this.subCategories.filter(val => val.id !== this.subCategory.id);
            this.deleteSubCategoryDialog = false;
            this.subCategory = {};
            this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'category Deleted', life: 3000 });
          })
          .catch(error => {
            console.error(error);
            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete subCategory', life: 3000 });
          });
    },    

    confirmDeleteCategory(subCategory)
    {
      this.subCategory = subCategory;
      this.deleteSubCategoryDialog = true;
    },

    openNew() {
      this.subCategory = {};
      this.submitted = false;
      this.subCategoryDialog = true;
    },
    hideDialog() {
      this.subCategoryDialog = false;
      this.submitted = false;
    },

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.subCategories.length; i++) {
          if (this.subCategories[i].id === id) {
            index = i;
            break;
          }
        }
        return index;
      },
  
      confirmDeleteSelected() {
        this.deleteSubCategoryDialog = true;
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
</style>