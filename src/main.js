import { createApp } from 'vue'


import MainComponent from './MainComponent.vue';
import router from './routers/index';

const app = createApp(MainComponent);
app.use(router);
app.mount('#app')