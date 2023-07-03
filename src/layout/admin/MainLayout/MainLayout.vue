<template>
    <div> 
        <header>
            <HeaderComponent/>
        </header>

		<div class="wrapper d-flex">
			<nav id="sidebar" class="">
				<div class="custom-menu">
					<button type="button" id="sidebarCollapse" class="btn btn-primary">
	                    <i class="fa fa-bars"></i>
	                    <span class="sr-only">Toggle Menu</span>
	                </button>
                </div>
                <div class="p-4 navbar-container">
                    <h1>
                        <router-link to="/admin" class="logo">
                            Market
                            <span>Online Market</span>
                        </router-link>
                    </h1>
                    <ul class="list-unstyled components mb-5">
                        <li class="active">
                            <router-link to="/admin"><span class="fa fa-home mr-3"></span> Home</router-link>
                        </li>
                        <li>
                            <router-link to="/admin/roles"><span class="fa fa-user mr-3"></span> Roles</router-link>
                        </li>
                        <li>
                            <router-link to="/admin/products"><span class="mr-3 fa-brands fa-product-hunt"></span> Products</router-link>
                        </li>
                        <li>
                            <router-link to="/admin/categories"><span class="fa-solid fa-book-open mr-3"></span> Categories</router-link>
                        </li>
                        <li>
                            <router-link to="/admin/subcategories"><span class="fa-solid fa-code-branch mr-3"></span> Sub Categories</router-link>
                        </li>
                      <li>
                        <router-link to="/admin/packages"><span class="fa fa-briefcase mr-3"></span>Packages</router-link>
                      </li>
                        <li>
                            <router-link to="/admin/orders"><span class="fa-brands fa-first-order mr-3"></span> Orders</router-link>
                        </li>
                        <li>
                            <router-link to="/admin/users"><span class="fa fa-users mr-3"></span> Users</router-link>
                        </li>
                    </ul>
                </div>
    	    </nav>
            <!-- Page Content  -->
            <div id="content" class="p-4 p-md-5 pt-5 ">
                <RouterView></RouterView>
            </div>
        </div>
    </div>        
</template>

<script>
import '@/jquery.custom.js';
import HeaderComponent from '@/layout/admin/Header/Header.vue'
import FooterComponent from '@/layout/admin/Footer/Footer.vue'

export default {
    components:{
        HeaderComponent,
        FooterComponent,
        
     },

     mounted() {
        (function($) {

            "use strict";
        
            var fullHeight = function() {
        
                $('.js-fullheight').css('height', $(window).height());
                $(window).resize(function(){
                    $('.js-fullheight').css('height', $(window).height());
                });
        
            };
            fullHeight();
        
            $('#sidebarCollapse').on('click', function () {
              $('#sidebar').toggleClass('active');
          });

        })(jQuery);

      }
}
</script>

<style src="./mainLayout.css" scoped></style>