import { createRouter, createWebHistory } from "vue-router";
import { requireAdminAuth } from "@/guards/guard";
import { requireAuth } from "@/guards/guard";

import NotFoundComponent from "@/layout/user/NotFound/NotFoundComponent.vue";
import HomeComponent from "@/layout/user/Home/Home.vue";
import AdminHomeComponent from "@/layout/admin/Home/Home.vue";

import MainPageComponent from "@/layout/user/MainPage/MainPage.vue";
import Login from "@/layout/auth/Login.vue";
import Register from "@/layout/auth/Register.vue";
import MainLayout from "@/layout/admin/MainLayout/MainLayout.vue";
import shopcomponent from "@/layout/user/shop/shopComponent.vue";
import Roles from "@/layout/admin/Roles/Roles.vue";
import Orders from "@/layout/admin/Orders/Orders.vue";
import OrderDetails from "@/layout/admin/OrderDetails/OrderDetails.vue";
import Reviews from "@/layout/admin/Reveiws/Reviews.vue";
import contactComponent from "@/layout/user/contact/contactComponent.vue";
import productDetailsComponent from "@/layout/user/ProductDetails/productDetailsComponent.vue";
import cart from "@/layout/user/Cart/CartComponent.vue";
import CheckOutComponent from "@/layout/user/CheckOutComponent/CheckOutComponent.vue";
import UserProfileComponent from "@/layout/user/UserProfile/UserProfileComponent.vue";
import WishListComponent from "@/layout/user/WishList/WishListComponent.vue";
import PackageComponent from "@/layout/user/Package/PackageComponent.vue";




import Products from "@/layout/admin/Products/Products.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "",
      component: MainPageComponent,
      children: [
        {
          path: "",
          component: HomeComponent,
        },
        {
          path: "/shop",
          component: shopcomponent,
        },
        {
            path:'/contact',
            component:contactComponent
        },
        {
            path:'/productDetails',
            component:productDetailsComponent
        },
        {
            path:'/cart',
            component:cart
        },
        {
            path:'/checkout',
            component:CheckOutComponent
        },
        {
            path:'/profile',
            component:UserProfileComponent
        },
        {
            path:'/wishlist',
            component:WishListComponent
        },
        {
            path:'/package',
            component:PackageComponent
        }
        //  Here Add any route to show in mainpage that contains Header and footer Component
      ],
    },
    {
      path: "/admin",
      component: MainLayout,
      beforeEnter: requireAdminAuth,
      children: [
        {
          path: "",
          component: AdminHomeComponent,
        },
        {
          path: "roles",
          component: Roles,
        },
        {
          path: "order-details/:id",
          component: OrderDetails,
        },
        {
          path: "orders",
          component: Orders,
        },
        {
          path: "reviews",
          component: Reviews,
        },
        {
          path: "products",
          component: Products,
        },
      ],
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/:catchAll(.*)",
      component: NotFoundComponent,
    },
    //  Here Add any route to show in page that Not contains Header and footer Component
  ],
});


export default router;
