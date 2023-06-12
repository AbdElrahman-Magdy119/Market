import { createRouter,createWebHistory } from "vue-router";

import NotFoundComponent from '@/layout/user/NotFound/NotFoundComponent.vue';
import HomeComponent from '@/layout/user/Home/Home.vue';
import AdminHomeComponent from '@/layout/admin/Home/Home.vue';

import MainPageComponent from '@/layout/user/MainPage/MainPage.vue';
import Login from "@/layout/auth/Login.vue";
import Register from "@/layout/auth/Register.vue";
import MainLayout from "@/layout/admin/MainLayout/MainLayout.vue";

import Roles from "@/layout/admin/Roles/Roles.vue";
import Orders from "@/layout/admin/Orders/Orders.vue";
import OrderDetails from "@/layout/admin/OrderDetails/OrderDetails.vue";
import Reviews from "@/layout/admin/Reveiws/Reviews.vue";

import Products from "@/layout/admin/products/Products.vue";


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
            {
                path:'order-details/:id',
                component:OrderDetails
            },
            {
                path:'orders',
                component:Orders
            },
            {
                path:'reviews',
                component:Reviews
            },
            {
                path:'products',
                component:Products
            }
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