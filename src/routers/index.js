import { createRouter,createWebHistory } from "vue-router";

import NotFoundComponent from '@/layout/user/NotFound/NotFoundComponent.vue';
import HomeComponent from '@/layout/user/Home/Home.vue';
import MainPageComponent from '@/layout/MainPage/MainPage.vue';


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