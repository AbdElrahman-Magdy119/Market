<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <Toast></Toast>
          <DataTable ref="dt" :value="package_items" v-model:selection="selectedPackages" dataKey="tableId"
                     :paginator="true" :rows="10" :filters="filters"
                     paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                     :rowsPerPageOptions="[5,10,25]"
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} packages">
            <template #header>
              <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 class="m-0">Manage package Details</h4>
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
<!--            <Column field="product.image" header="Image" sortable="true" style="min-width:16rem">-->
<!--              <template #body="rowData">-->
<!--                <img :src="`http://localhost:8000/`+rowData.data.product.image" alt="..."/>-->
<!--              </template>-->
<!--            </Column>-->

            <Column field="product.price" header="Price" sortable="true" style="min-width:16rem"></Column>

            <Column :exportable="false" style="min-width:8rem">
              <template #body="slotProps">
                {{slotProps.data.name}}
                <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editPackage(slotProps.data)" />
                <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeletePackage(slotProps.data)" />
              </template>
            </Column>
          </DataTable>

        </div>

        <Dialog v-model:visible="deletePackageDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="package">Are you sure you want to delete <b>{{product.name}}</b>?</span>
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deletePackageDialog = false"/>
            <Button label="Yes" icon="pi pi-check" text @click="deletePackage" />
          </template>
        </Dialog>

        <Dialog v-model:visible="deletePackagesDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="package">Are you sure you want to delete the selected packages?</span>
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deletePackagesDialog = false"/>
            <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedPackages" />
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
import {FilterMatchMode} from "primevue/api";
import PackageService from "@/services/PackageService";
import products from "@/layout/admin/Products/Products.vue";
export default({
  name: "packageDetails",
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
      packageDialog: false,
      deletePackageDialog: false,
      product: {},
      packageId: null,
      packageStatus:'',
      selectedPackages: null,
      filters: {},
      submitted: false,
      deletePackagesDialog:false,
      id: null, //this is the id from the browser
      package_items: []
    };
  },
  created() {
    const url = this.$route.path;
    this.id = url.substring(url.lastIndexOf('/') + 1);
    this.initFilters();
    // Add index property to each package object
    this.packages.forEach((package_items, index) => {
      package_items.index = index + 1;
    });
  },
  mounted() {
    PackageService.getPackageByID(this.id).then((response) => {
      // console.log();
    this.package_items = response.data.data.package_items;
    //   this.user = data.data.data.user;
    //   this.package = data.data.data;
    //   console.log(data.data.data);
    //   this.packageStatus = data.data.data.status

      // this.packages.forEach((package_items, index) => {
      //   package_items.index = index + 1;
      // });
    });
  },
  methods: {
    openNew() {
      this.package = {};
      this.submitted = false;
      this.packageDialog = true;
    },
    hideDialog() {
      this.packageDialog = false;
      this.submitted = false;
    },
    editPackage(pkg) {
      this.package = { ...pkg };
      this.packageDialog = true;
    },
    confirmDeletePackage(pckage) {
      console.log(pckage.product);
      this.product = pckage;
      this.deletePackageDialog = true;
    },
    deletePackage() {
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
      this.deletePackagesDialog = true;
    },
    // deleteSelectedPackages() {
    //   const packageIds = this.selectedPackages.map(package => package.id);
    //   packageService.deletePackage(packageIds)
    //       .then(() => {
    //         this.packages = this.packages.filter(val => !this.selectedPackages.includes(val));
    //         this.deletePackagesDialog = false;
    //         this.selectedPackages = null;
    //         this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'packages Deleted', life: 3000 });
    //       })
    //       .catch(error => {
    //         console.error(error);
    //         this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete packages', life: 3000 });
    //       });
    // },
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
