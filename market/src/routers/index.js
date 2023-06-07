import { createRouter,createWebHistory } from "vue-router";

import NotFoundComponent from '../components/NotFoundComponent/NotFoundComponent.vue';
import HomeComponent from '../components/HomeComponent/HomeComponent.vue';
import MainPageComponent from '../components/MainPageComponent/MainPageComponent.vue';


const routes = [
    {
      path: '',
      component: MainPageComponent,
      children: [
        {
            path:'',
            component:HomeComponent 
        },
        //  Here Add any route to show in mainpage that contains Header and footer Component
      ],
    },
    {
        path:'/:catchAll(.*)',
        component:NotFoundComponent
    }
    //  Here Add any route to show in page that Not contains Header and footer Component
    
  ]



const router = createRouter({
    routes: routes,
    history:createWebHistory()
});

export default router;