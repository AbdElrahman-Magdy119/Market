import { createRouter, createWebHistory } from "vue-router";
import { requireAdminAuth } from "@/guards/guard";
import { requireAuth } from "@/guards/guard";

import NotFoundComponent from "@/layout/user/NotFound/NotFoundComponent.vue";
import HomeComponent from "@/layout/user/Home/HomeComponent.vue";
import AdminHomeComponent from "@/layout/admin/Home/Home.vue";

import MainPageComponent from "@/layout/user/MainPage/MainPage.vue";
import Login from "@/layout/auth/Login.vue";
import Register from "@/layout/auth/Register.vue";
import MainLayout from "@/layout/admin/MainLayout/MainLayout.vue";
import Roles from "@/layout/admin/Roles/Roles.vue";
import Orders from "@/layout/admin/Orders/Orders.vue";
import OrderDetails from "@/layout/admin/OrderDetails/OrderDetails.vue";
import Reviews from "@/layout/admin/Reveiws/Reviews.vue";
import contactComponent from "@/layout/user/contact/contactComponent.vue";
import CheckOutComponent from "@/layout/user/CheckOutComponent/CheckOutComponent.vue";
import UserProfileComponent from "@/layout/user/UserProfile/UserProfileComponent.vue";
import WishListComponent from "@/layout/user/WishList/WishListComponent.vue";
import SubCategoryComponent from "@/layout/user/subcategory/SubCategoryComponent.vue";
import Products from "@/layout/admin/Products/Products.vue";
import Packages from "@/layout/admin/Packages/Packages.vue";
import ProductBySubcategoryComponent from "@/layout/user/ProductBySubcategory/ProductBySubcategoryComponent.vue";
import PackagesDetailsComponent from "@/layout/user/PackagesDetails/PackagesDetailsComponent.vue";
import ProductDetailsComponent from "@/layout/user/ProductDetails/ProductDetailsComponent.vue";
import Categories from "@/layout/admin/Categories/Categories.vue";
import SubCategories from "@/layout/admin/Categories/SubCategories.vue";
import CartComponent from "@/layout/user/Cart/CartComponent.vue";
import ChatbotComponent from "@/layout/user/ChatbotComponent/ChatbotComponent.vue";


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
          path: "/contact",
          component: contactComponent,
        },
        {
          path: "/checkout",
          component: CheckOutComponent,
        },
        {
          path: "/profile",
          component: UserProfileComponent,
          beforeEnter: requireAuth,
        },
        {
          path: "/wishlist",
          component: WishListComponent,
          beforeEnter: requireAuth,
        },
        {
          path: "/subcategory/:id",
          component: SubCategoryComponent,
        },
        {
          path: "/productBySubcategory/:idSubCategory",
          component: ProductBySubcategoryComponent,
        },
        {
          path: "/package/:idPackage",
          component: PackagesDetailsComponent,
        },
        {
          path: "/productDetails/:idProduct",
          component: ProductDetailsComponent,
        },
        {
          path: "/cart",
          component: CartComponent,
          beforeEnter: requireAuth,
        },
        {
          path: "/chatbot",
          component: ChatbotComponent,
          // beforeEnter: requireAuth,
        },
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
          path: "reviews/product/:prdId",
          component: Reviews,
        },
        {
          path: "products",
          component: Products,
        },
        {
          path: "packages",
          component: Packages,
        },
        {
          path: "categories",
          component: Categories,
        },
        {
          path: "subcategories",
          component: SubCategories,
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
