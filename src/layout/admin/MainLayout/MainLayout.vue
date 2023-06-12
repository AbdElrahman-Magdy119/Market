<template>
		<div class="wrapper d-flex align-items-stretch row">
			<nav id="sidebar" class=" col-3">
				<div class="custom-menu">
					<button type="button" id="sidebarCollapse" class="btn btn-primary">
	                    <i class="fa fa-bars"></i>
	                    <span class="sr-only">Toggle Menu</span>
	                </button>
                </div>
                <div class="p-4">
                    <h1>
                        <a href="" class="logo">Market <span>Online Market</span></a>
                    </h1>
                    <ul class="list-unstyled components mb-5">
                        <li class="active">
                            <a href="#"><span class="fa fa-home mr-3"></span> Home</a>
                        </li>
                        <li>
                            <router-link to="/admin/roles"><span class="fa fa-user mr-3"></span> Roles</router-link>
                        </li>
                        <li>
                            <a href="#"><span class="fa fa-briefcase mr-3"></span> Works</a>
                        </li>
                        <li>
                            <a href="#"><span class="fa fa-sticky-note mr-3"></span> Blog</a>
                        </li>
                        <li>
                            <a href="#"><span class="fa fa-suitcase mr-3"></span> Gallery</a>
                        </li>
                        <li>
                            <router-link to="/admin/orders"><span class="fa fa-cogs mr-3"></span> Orders</router-link>
                        </li>
                        <li>
                            <router-link to="/admin/reviews"><span class="fa fa-paper-plane mr-3"></span> Reviews</router-link>
                        </li>
                    </ul>
                </div>
    	    </nav>
            <!-- Page Content  -->
            <div id="content" class="p-4 p-md-5 pt-5 col-8">
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

   <div>


    </div>
</template>

<script>
import '@/jquery.js'; // Import the jQuery configuration file
import HeaderComponent from '@/layout/user/Header/Header.vue'
import FooterComponent from '@/layout/user/Footer/Footer.vue'

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