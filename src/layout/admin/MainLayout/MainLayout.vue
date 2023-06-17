<template>
		<div class="wrapper d-flex">
			<nav id="sidebar" class="">
				<div class="custom-menu">
					<button type="button" id="sidebarCollapse" class="btn btn-primary">
	                    <i class="fa fa-bars"></i>
	                    <span class="sr-only">Toggle Menu</span>
	                </button>
                </div>
                <div class="p-4">
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
                            <router-link to="/admin/products"><span class="fa fa-user mr-3"></span> Products</router-link>
                        </li>
                        <li>
                            <router-link to="/admin/categories"><span class="fa fa-user mr-3"></span> Categories</router-link>
                        </li>
                        <li>
                            <router-link to="/admin/subcategories"><span class="fa fa-user mr-3"></span> Sub Categories</router-link>
                            <router-link to="/admin/category"><span class="fa fa-briefcase mr-3"></span> Category</router-link>
                        </li>
<!--                        <li>-->
<!--                            <a href="#"><span class="fa fa-sticky-note mr-3"></span> Blog</a>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                            <a href="#"><span class="fa fa-suitcase mr-3"></span> Gallery</a>-->
<!--                        </li>-->
                        <li>
                            <router-link to="/admin/orders"><span class="fa fa-cogs mr-3"></span> Orders</router-link>
                        </li>
                    </ul>
                </div>
    	    </nav>
            <!-- Page Content  -->
            <div id="content" class="p-4 p-md-5 pt-5 ">
                <div>
                    <HeaderComponent/>
                </div>

                <div> 
                    <RouterView></RouterView>
                </div>

                <div>
                    <FooterComponent/>
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

<style src="./mainLayout.css"></style>