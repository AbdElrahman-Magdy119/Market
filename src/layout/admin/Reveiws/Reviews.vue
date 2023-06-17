<template>
    <div>
        <Toast></Toast>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedReviews || !selectedReviews.length" />
<!--                    <div class="field mx-3">-->
<!--                        <Dropdown @change="getAllReviews($event.value)" id="product" v-model.trim="prd.name" optionValue="value" :options="productOptions" optionLabel="label" />-->
<!--                    </div>-->
                </template>



            </Toolbar>

            <DataTable ref="dt" :value="reviews" v-model:selection="selectedReviews" dataKey="id"
                       :paginator="true" :rows="10" :filters="filters"
                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} reviews">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h4 class="m-0">Manage reviews</h4>
                        <span class="p-input-icon-left">
                          <i class="pi pi-search" />
                          <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column :field="'index'" header="#" style="width: 3rem" :exportable="false"></Column>
                <Column field="comment" header="Comment" sortable style="min-width:16rem"></Column>
                <Column field="rating" header="Rating" sortable style="min-width:16rem"></Column>

                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
<!--                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editReview(slotProps.data)" />-->
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteReview(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="reviewDialog" :style="{width: '450px'}" header="review Details" :modal="true" class="p-fluid">
            <div class="field">
                <label for="comment">Comment</label>
                <InputText id="comment" v-model.trim="review.comment" required="true" autofocus :class="{'p-invalid': submitted && !review.comment}" />
                <small class="p-error" v-if="submitted && !review.comment">Comment is required.</small>
            </div>
            <div class="field">
                <label for="rating">Rating</label>
                <Textarea id="rating" v-model="review.rating" required="true" rows="3" cols="20" />
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" text @click="saveReview" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteReviewDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="review">Are you sure you want to delete <b>{{review.comment}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteReviewDialog = false"/>
                <Button label="Yes" icon="pi pi-check" text @click="deleteReview" />
            </template>
        </Dialog>
    </div>
</template>

<script>
import * as router from 'vue-router';
import { FilterMatchMode } from 'primevue/api';
import reviewService  from '@/services/ReviewService';
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
    name:"Reviews",
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
            products:[],
            reviews: [], // Initialize as an empty array
            reviewDialog: false,
            deleteReviewDialog: false,
            review: {},
            prd:{},
            selectedReviews: null,
            filters: {},
            submitted: false,
            deleteSelectedReviews: [],
            productOptions:[],
            product_id: null,
        }
    },
    created() {
        const url = this.$route.path;
        this.product_id = url.substring(url.lastIndexOf('/') + 1);
        console.log(this.product_id);

        this.initFilters();
        // Add index property to each review object
        this.reviews.forEach((review, index) => {
            review.index = index + 1; // Adding 1 to display index starting from 1
        });
    },
    mounted() {

        reviewService.getAllReviews(this.product_id).then((data) => {
                console.log(data.data.data);
                this.reviews = data.data.data;

                // Add index property to each review object
                this.reviews.forEach((review, index) => {
                    review.index = index + 1; // Adding 1 to display index starting from 1
                });
            })
    },
    methods: {
        getAllReviews(prdId) {
            reviewService.getAllReviews(prdId).then((data) => {
                console.log(data.data.data);
                this.reviews = data.data.data;

                // Add index property to each review object
                this.reviews.forEach((review, index) => {
                    review.index = index + 1; // Adding 1 to display index starting from 1
                });
            })
        },
        openNew() {
            this.review = {};
            this.submitted = false;
            this.reviewDialog = true;
        },
        hideDialog() {
            this.reviewDialog = false;
            this.submitted = false;
        },
        saveReview() {
            this.submitted = true;
            if (this.review.name && this.review.description) {
                if (this.review.id) {
                    // Update existing review
                    reviewService.updateReview(this.review.id, this.review)
                        .then(() => {
                            this.reviews[this.findIndexById(this.review.id)] = this.review;
                            this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'review Updated', life: 3000 });
                        })
                        .catch(error => {
                            console.error(error);
                            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update review', life: 3000 });
                        });
                } else {
                    // Create a new review
                    reviewService.addreview(this.review)
                        .then(response => {
                            const newreview = response.data; // Assuming the API returns the newly created review
                            this.reviews.push(newreview);
                            this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'review Created', life: 3000 });
                        })
                        .catch(error => {
                            console.error(error);
                            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to create review', life: 3000 });
                        });
                }

                this.reviewDialog = false;
                this.review = {};
                this.submitted = false;
            }
        },
        editReview(review) {
            this.review = { ...review };
            this.reviewDialog = true;
        },
        confirmDeleteReview(review) {
            this.review = review;
            this.deleteReviewDialog = true;
        },
        deleteReview() {
            console.log(this.review.id);
            reviewService.deleteReview(this.review.id)
                .then(() => {
                    this.reviews = this.reviews.filter(val => val.id !== this.review.id);
                    this.deleteReviewDialog = false;
                    this.review = {};
                    this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'review Deleted', life: 3000 });
                })
                .catch(error => {
                    console.error(error);
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete review', life: 3000 });
                });
        },
        findIndexById(id) {
            let index = -1;
            for (let i = 0; i < this.reviews.length; i++) {
                if (this.reviews[i].id === id) {
                    index = i;
                    break;
                }
            }
            return index;
        },
        confirmDeleteSelected() {
            this.deleteReviewDialog = true;
        },
        initFilters() {
            this.filters = {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            }
        },
    }
}
</script>
