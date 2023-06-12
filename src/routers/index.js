import { createRouter,createWebHistory } from "vue-router";

import NotFoundComponent from '@/layout/user/NotFound/NotFoundComponent.vue';
import HomeComponent from '@/layout/user/Home/Home.vue';
import AdminHomeComponent from '@/layout/admin/Home/Home.vue';

import MainPageComponent from '@/layout/user/MainPage/MainPage.vue';
import Login from "@/layout/auth/Login.vue";
import Register from "@/layout/auth/Register.vue";
import MainLayout from "@/layout/admin/MainLayout/MainLayout.vue";
import shopcomponent from "@/layout/user/shop/shopComponent.vue";
import Roles from "@/layout/admin/Roles/Roles.vue";


const routes = [
    {
      path: '',
      component: MainPageComponent,
      children: [
        {
            path:'',
            component:HomeComponent 
        },
        {
            path:'/shop',
            component:shopcomponent 
        },
        //  Here Add any route to show in mainpage that contains Header and footer Component
      ],
    },
    {
        path: '/admin',
        component:MainLayout ,
        children: [
            {
                path:'',
                component:AdminHomeComponent
            },
            {
                path:'roles',
                component:Roles
            },
            //  Here Add any route to show in mainpage that contains Header and footer Component
        ],
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
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