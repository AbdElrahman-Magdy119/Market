import { createApp } from 'vue/dist/vue.esm-bundler'
import MainComponent from './MainComponent.vue'
// import '@/jquery.custom.js';
import PrimeVue from 'primevue/config'
import router from './routers/index'

import 'primevue/resources/themes/saga-blue/theme.css' // or whichever theme you want
import 'primevue/resources/primevue.min.css'
import ToastService from 'primevue/toastservice';


createApp(MainComponent)
    .use(router)
    .use(PrimeVue)
    .use(ToastService)
    .mount('#app')