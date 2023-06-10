import { createApp } from 'vue'
import MainComponent from './MainComponent.vue'

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