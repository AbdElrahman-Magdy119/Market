import { createApp } from 'vue/dist/vue.esm-bundler'
import MainComponent from './MainComponent.vue'
// import '@/jquery.custom.js';

import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import router from './routers/index'

import 'primevue/resources/themes/saga-blue/theme.css' // or whichever theme you want
import 'primevue/resources/primevue.min.css'
import ToastService from 'primevue/toastservice';
import VueGapi from "vue-gapi";


 const pinia=createPinia();


const apiConfig = {
    apiKey: '',
    clientId: '380461466531-96gor4tmukkkijan8kia9plir6c1g112.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
};

createApp(MainComponent)
    .use(pinia)
    .use(router)
    .use(VueGapi,apiConfig)
    .use(PrimeVue)
    .use(ToastService)
    .mount('#app')