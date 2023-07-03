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
import gAuthPlugin from 'vue3-google-oauth2';
import BadgeDirective from 'primevue/badgedirective';



 const pinia=createPinia();


const apiConfig = {
    apiKey: '',
    clientId: '380461466531-96gor4tmukkkijan8kia9plir6c1g112.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
};

let gauthClientId = "380461466531-kks7596sd3o6kufbm8iiem2clbdrb2b2.apps.googleusercontent.com";


createApp(MainComponent)
    .use(pinia)
    // .use(gAuthPlugin, {
    //     clientId: gauthClientId,
    //     scope: 'email',
    //     prompt: 'consent'
    // })
    .use(router)
    // .use(VueGapi,apiConfig)
    .use(PrimeVue)
    .use(ToastService)
    .directive('badge', BadgeDirective)
    .mount('#app')