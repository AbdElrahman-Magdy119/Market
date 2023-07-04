<template>
    <section class="checkout spad mt-5">
        <Toast></Toast>
        <div class="container">
            <div class="checkout__form">
                <h4>Account Information</h4>
                <form action="#">
                    <div class="row">
                        <div class="col-lg-8 col-md-6">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="checkout__input">
                                        <p>First Name<span>*</span></p>
                                        <input type="text" v-model=user.firstName ref="firstName"  @blur="show()" >
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="checkout__input">
                                        <p>Last Name<span>*</span></p>
                                        <input type="text" v-model=user.lastName ref="lastName" @blur="show()" >
                                    </div>
                                </div>
                            </div>

                            <div class="checkout__input">
                                <p>Address 1<span>*</span></p>
                                <input type="text" placeholder="Street Address" class="checkout_input_add" v-model=user.address ref="address1"  @blur="show()">
                                <span v-if="!user.address || user.address=='null'" class="error-message">Address is required</span>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="checkout__input">
                                        <p>Phone<span>*</span></p>
                                        <input type="text" v-model=user.phone ref="phone" @blur="show()">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="checkout__input">
                                        <p>Email<span>*</span></p>
                                        <input type="text" v-model=user.email ref="email" @blur="show()">
                                    </div>
                                </div>
                                <div class="content">
                                    <button class="btn" @click.prevent="edit()" > Update Info </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="container mt-5">
            <div class="row delete-account bg-light align-items-center justify-content-center p-5"
                 style="border-radius:10px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
                <div class="col-12 col-md-9">
                    <div>
                        <h3>Delete Account</h3>
                        <p>Delete your user account and remove your self from our book store.
                            <b class="text-muted">
                                This cannot be undone
                            </b>
                        </p>
                    </div>
                </div>
                <div class="col-12 col-md-3 text-end">
                    <Button label="Delete Account" severity="danger" size="large" raised @click="deleteReviewDialogFunc"/>
                </div>
            </div>

            <Dialog v-model:visible="deleteReviewDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span v-if="user">Are you sure you want to delete <b>{{user.firstName+' '+user.lastName}}</b>?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" text @click="deleteReviewDialog = false"/>
                    <Button label="Yes" icon="pi pi-check" text @click="onDeleteAccount(user.id)" />
                </template>
            </Dialog>
        </div>
    </section>

</template>

<script>
import  Toast  from 'primevue/toast';
import  Dialog  from 'primevue/dialog';
import  Button  from 'primevue/button';
import usersService from '@/services/UserService';
import HomeService from "@/services/HomeService";
export default {
    components:{
        Toast,
        Button,
        Dialog
    },
    data() {
        return {
            checkData:true,
            deleteReviewDialog:false,
            updatedUser: {},
            user:{
                id:localStorage.getItem('id'),
                firstName:localStorage.getItem('name'),
                lastName:localStorage.getItem('lastName'),
                email:localStorage.getItem('email'),
                phone:localStorage.getItem('phone'),
                address:localStorage.getItem('address'),
            }
        };
    },
    mounted() {
        this.user.id = localStorage.getItem('id');
        if(this.user.address === 'null'){
            this.user.address = '';
        }

        if(this.user.phone === 'null'){
            this.user.phone = '';
        }
    },
    methods:{
        show(){
            this.checkData = false;

                this.updatedUser = {
                firstName : this.user.firstName,
                lastName : this.user.lastName,
                phone : this.user.phone,
                address : this.user.address,
                email : this.user.email,
            }
        },
        edit(){
            if (!this.user.firstName || !this.user.lastName || !this.user.address || !this.user.phone || !this.user.email) {
                // Display an error message or toast notification
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Please fill in all required fields.',
                    life: 3000
                });
                return;
            }

            HomeService.updateUserData(this.user.id, this.user)
                .then((response) => {
                    console.log(response);
                    console.log("done");
                    this.$toast.add({
                        severity: 'success',
                        summary: 'Successfully',
                        detail: 'Data updated.',
                        life: 3000
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        deleteReviewDialogFunc(){
            this.deleteReviewDialog = true;
        },
        onDeleteAccount(user_id){
            HomeService.deleteUser(user_id)
                .then((res)=>{
                    this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'User deleted successfully', life: 3000 });
                    setTimeout(() => {
                        localStorage.clear();
                        this.$router.push("/login");
                    }, 4000);
                })
                .catch((err)=>{
                    console.log(err)
                })

            this.deleteReviewDialog = false;
        },
    }
}
</script>


<style scoped>
/******************************************************************
    Template Name: Ogani
    Description:  Ogani eCommerce  HTML Template
    Author: Colorlib
    Author URI: https://colorlib.com
    Version: 1.0
    Created: Colorlib
  ******************************************************************/

/*------------------------------------------------------------------
  [Table of contents]

  1.  Template default CSS
      1.1	Variables
      1.2	Mixins
      1.3	Flexbox
      1.4	Reset
  2.  Helper Css
  3.  Header Section
  4.  Hero Section
  5.  Service Section
  6.  Categories Section
  7.  Featured Section
  8.  Latest Product Section
  9.  Contact
  10.  Footer Style
  -------------------------------------------------------------------*/

/*----------------------------------------*/
/* Template default CSS
  /*----------------------------------------*/
.error-message {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}



html,
body {
    height: 100%;
    font-family: "Cairo", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0;
    color: #111111;
    font-weight: 400;
    font-family: "Cairo", sans-serif;
}

a {
    text-decoration: none;
}

h1 {
    font-size: 70px;
}

h2 {
    font-size: 36px;
}

h3 {
    font-size: 30px;
}

h4 {
    font-size: 24px;
}

h5 {
    font-size: 18px;
}

h6 {
    font-size: 16px;
}

p {
    font-size: 16px;
    font-family: "Cairo", sans-serif;
    color: #6f6f6f;
    font-weight: 400;
    line-height: 26px;
    margin: 0 0 15px 0;
}

img {
    max-width: 100%;
}

input:focus,
select:focus,
button:focus,
textarea:focus {
    outline: none;
}

a:hover,
a:focus {
    text-decoration: none;
    outline: none;
    color: #ffffff;
}

ul,
ol {
    padding: 0;
    margin: 0;
}

.btn{
    margin-top: 1rem;
    display: inline-block;
    padding: 1.3rem 3.5rem;
    font-size: 1.7rem;
    color: var(--white);
    border-radius: .5rem;
    background: var(--primary-color);
    cursor: pointer;
}

.btn:hover{
    color: var(--white);
    background: var(--secondary);
    box-shadow: var(--box-shadow);
}


/*---------------------
    Helper CSS
  -----------------------*/

.section-title {
    margin-bottom: 50px;
    text-align: center;
}

.section-title h2 {
    color: #1c1c1c;
    font-weight: 700;
    position: relative;
}

.section-title h2:after {
    position: absolute;
    left: 0;
    bottom: -15px;
    right: 0;
    height: 4px;
    width: 80px;
    background: #7fad39;
    content: "";
    margin: 0 auto;
}

.set-bg {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
}

.spad {
    padding-top: 100px;
    padding-bottom: 100px;
}

.text-white h1,
.text-white h2,
.text-white h3,
.text-white h4,
.text-white h5,
.text-white h6,
.text-white p,
.text-white span,
.text-white li,
.text-white a {
    color: #fff;
}

/* buttons */

.primary-btn {
    display: none;
    font-size: 14px;
    padding: 10px 28px 10px;
    color: #ffffff;
    text-transform: uppercase;
    font-weight: 700;
    background: #7fad39;
    letter-spacing: 2px;
}

.site-btn {
    font-size: 14px;
    color: #ffffff;
    font-weight: 800;
    text-transform: uppercase;
    display: none;
    padding: 13px 30px 12px;
    background: #3bb77e;
    border: none;
}

.site-btn:hover {
    background: #ffba43;
}

/* Preloder */

#preloder {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999999;
    background: #000;
}

.loader {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -13px;
    margin-left: -13px;
    border-radius: 60px;
    animation: loader 0.8s linear infinite;
    -webkit-animation: loader 0.8s linear infinite;
}

@keyframes loader {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        border: 4px solid #f44336;
        border-left-color: transparent;
    }

    50% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
        border: 4px solid #673ab7;
        border-left-color: transparent;
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
        border: 4px solid #f44336;
        border-left-color: transparent;
    }
}

@-webkit-keyframes loader {
    0% {
        -webkit-transform: rotate(0deg);
        border: 4px solid #f44336;
        border-left-color: transparent;
    }

    50% {
        -webkit-transform: rotate(180deg);
        border: 4px solid #673ab7;
        border-left-color: transparent;
    }

    100% {
        -webkit-transform: rotate(360deg);
        border: 4px solid #f44336;
        border-left-color: transparent;
    }
}

/*---------------------
    Header
  -----------------------*/

.header__top {
    background: #f5f5f5;
}

.header_top_left {
    padding: 10px 0 13px;
}

.header_top_left ul li {
    font-size: 14px;
    color: #1c1c1c;
    display: inline-block;
    margin-right: 45px;
    position: relative;
}

.header_top_left ul li:after {
    position: absolute;
    right: -25px;
    top: 1px;
    height: 20px;
    width: 1px;
    background: #000000;
    opacity: 0.1;
    content: "";
}

.header_top_left ul li:last-child {
    margin-right: 0;
}

.header_top_left ul li:last-child:after {
    display: none;
}

.header_top_left ul li i {
    color: #252525;
    margin-right: 5px;
}

.header_top_right {
    text-align: right;
    padding: 10px 0 13px;
}

.header_topright_social {
    position: relative;
    display: inline-block;
    margin-right: 35px;
}

.header_topright_social:after {
    position: absolute;
    right: -20px;
    top: 1px;
    height: 20px;
    width: 1px;
    background: #000000;
    opacity: 0.1;
    content: "";
}

.header_topright_social a {
    font-size: 14px;
    display: inline-block;
    color: #1c1c1c;
    margin-right: 20px;
}

.header_topright_social a:last-child {
    margin-right: 0;
}

.header_topright_language {
    position: relative;
    display: inline-block;
    margin-right: 40px;
    cursor: pointer;
}

.header_topright_language:hover ul {
    top: 23px;
    opacity: 1;
    visibility: visible;
}

.header_topright_language:after {
    position: absolute;
    right: -21px;
    top: 1px;
    height: 20px;
    width: 1px;
    background: #000000;
    opacity: 0.1;
    content: "";
}

.header_topright_language img {
    margin-right: 6px;
}

.header_topright_language div {
    font-size: 14px;
    color: #1c1c1c;
    display: inline-block;
    margin-right: 4px;
}

.header_topright_language span {
    font-size: 14px;
    color: #1c1c1c;
    position: relative;
    top: 2px;
}

.header_topright_language ul {
    background: #222222;
    width: 100px;
    text-align: left;
    padding: 5px 0;
    position: absolute;
    left: 0;
    top: 43px;
    z-index: 9;
    opacity: 0;
    visibility: hidden;
    -webkit-transition: all, 0.3s;
    -moz-transition: all, 0.3s;
    -ms-transition: all, 0.3s;
    -o-transition: all, 0.3s;
    transition: all, 0.3s;
}

.header_topright_language ul li {
    list-style: none;
}

.header_topright_language ul li a {
    font-size: 14px;
    color: #ffffff;
    padding: 5px 10px;
}

.header_topright_auth {
    display: inline-block;
}

.header_topright_auth a {
    display: block;
    font-size: 14px;
    color: #1c1c1c;
}

.header_topright_auth a i {
    margin-right: 6px;
}

.header__logo {
    padding: 15px 0;
}

.header__logo a {
    display: inline-block;
}

.header__menu {
    padding: 24px 0;
}

.header__menu ul li {
    list-style: none;
    display: inline-block;
    margin-right: 50px;
    position: relative;
}

.header_menu ul li .headermenu_dropdown {
    position: absolute;
    left: 0;
    top: 50px;
    background: #222222;
    width: 180px;
    z-index: 9;
    padding: 5px 0;
    -webkit-transition: all, 0.3s;
    -moz-transition: all, 0.3s;
    -ms-transition: all, 0.3s;
    -o-transition: all, 0.3s;
    transition: all, 0.3s;
    opacity: 0;
    visibility: hidden;
}

.header_menu ul li .headermenu_dropdown li {
    margin-right: 0;
    display: block;
}

.header_menu ul li .headermenu_dropdown li:hover>a {
    color: #7fad39;
}

.header_menu ul li .headermenu_dropdown li a {
    text-transform: capitalize;
    color: #ffffff;
    font-weight: 400;
    padding: 5px 15px;
}

.header__menu ul li.active a {
    color: #7fad39;
}

.header_menu ul li:hover .headermenu_dropdown {
    top: 30px;
    opacity: 1;
    visibility: visible;
}

.header__menu ul li:hover>a {
    color: #7fad39;
}

.header__menu ul li:last-child {
    margin-right: 0;
}

.header__menu ul li a {
    font-size: 14px;
    color: #252525;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 2px;
    -webkit-transition: all, 0.3s;
    -moz-transition: all, 0.3s;
    -ms-transition: all, 0.3s;
    -o-transition: all, 0.3s;
    transition: all, 0.3s;
    padding: 5px 0;
    display: block;
}

.header__cart {
    text-align: right;
    padding: 24px 0;
}

.header__cart ul {
    display: inline-block;
    margin-right: 25px;
}

.header__cart ul li {
    list-style: none;
    display: inline-block;
    margin-right: 15px;
}

.header__cart ul li:last-child {
    margin-right: 0;
}

.header__cart ul li a {
    position: relative;
}

.header__cart ul li a i {
    font-size: 18px;
    color: #1c1c1c;
}

.header__cart ul li a span {
    height: 13px;
    width: 13px;
    background: #7fad39;
    font-size: 10px;
    color: #ffffff;
    line-height: 13px;
    text-align: center;
    font-weight: 700;
    display: inline-block;
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: -12px;
}

.header_cart .headercart_price {
    font-size: 14px;
    color: #6f6f6f;
    display: inline-block;
}

.header_cart .headercart_price span {
    color: #252525;
    font-weight: 700;
}

.humberger_menu_wrapper {
    display: none;
}

.humberger__open {
    display: none;
}

/*---------------------
    Hero
  -----------------------*/

.hero {
    padding-bottom: 50px;
}

.hero.hero-normal {
    padding-bottom: 30px;
}

.hero.hero-normal .hero__categories {
    position: relative;
}

.hero.hero-normal .hero__categories ul {
    display: none;
    position: absolute;
    left: 0;
    top: 46px;
    width: 100%;
    z-index: 9;
    background: #ffffff;
}

.hero.hero-normal .hero__search {
    margin-bottom: 0;
}

.hero_categories_all {
    background: #7fad39;
    position: relative;
    padding: 10px 25px 10px 40px;
    cursor: pointer;
}

.hero_categories_all i {
    font-size: 16px;
    color: #ffffff;
    margin-right: 10px;
}

.hero_categories_all span {
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
}

.hero_categories_all:after {
    position: absolute;
    right: 18px;
    top: 9px;
    content: "3";
    font-family: "ElegantIcons";
    font-size: 18px;
    color: #ffffff;
}

.hero__categories ul {
    border: 1px solid #ebebeb;
    padding-left: 40px;
    padding-top: 10px;
    padding-bottom: 12px;
}

.hero__categories ul li {
    list-style: none;
}

.hero__categories ul li a {
    font-size: 16px;
    color: #1c1c1c;
    line-height: 39px;
    display: block;
}

.hero__search {
    overflow: hidden;
    margin-bottom: 30px;
}

.hero_search_form {
    width: 610px;
    height: 50px;
    border: 1px solid #ebebeb;
    position: relative;
    float: left;
}

.hero_searchform form .herosearch_categories {
    width: 30%;
    float: left;
    font-size: 16px;
    color: #1c1c1c;
    font-weight: 700;
    padding-left: 18px;
    padding-top: 11px;
    position: relative;
}

.hero_searchform form .herosearch_categories:after {
    position: absolute;
    right: 0;
    top: 14px;
    height: 20px;
    width: 1px;
    background: #000000;
    opacity: 0.1;
    content: "";
}

.hero_searchform form .herosearch_categories span {
    position: absolute;
    right: 14px;
    top: 14px;
}

.hero_search_form form input {
    width: 70%;
    border: none;
    height: 48px;
    font-size: 16px;
    color: #b2b2b2;
    padding-left: 20px;
}

.hero_search_form form input::placeholder {
    color: #b2b2b2;
}

.hero_search_form form button {
    position: absolute;
    right: 0;
    top: -1px;
    height: 50px;
}

.hero_search_phone {
    float: right;
}

.hero_searchphone_icon {
    font-size: 18px;
    color: #7fad39;
    height: 50px;
    width: 50px;
    background: #f5f5f5;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    float: left;
    margin-right: 20px;
}

.hero_searchphone_text {
    overflow: hidden;
}

.hero_searchphone_text h5 {
    color: #1c1c1c;
    font-weight: 700;
    margin-bottom: 5px;
}

.hero_searchphone_text span {
    font-size: 14px;
    color: #6f6f6f;
}

.hero__item {
    height: 431px;
    display: flex;
    align-items: center;
    padding-left: 75px;
}

.hero__text span {
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 4px;
    color: #7fad39;
}

.hero__text h2 {
    font-size: 46px;
    color: #252525;
    line-height: 52px;
    font-weight: 700;
    margin: 10px 0;
}

.hero__text p {
    margin-bottom: 35px;
}

/*---------------------
    Categories
  -----------------------*/

.categories__item {
    height: 270px;
    position: relative;
}

.categories__item h5 {
    position: absolute;
    left: 0;
    width: 100%;
    padding: 0 20px;
    bottom: 20px;
    text-align: center;
}

.categories__item h5 a {
    font-size: 18px;
    color: #1c1c1c;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 12px 0 10px;
    background: #ffffff;
    display: block;
}

.categories__slider .col-lg-3 {
    max-width: 100%;
}

.categories__slider.owl-carousel .owl-nav button {
    font-size: 18px;
    color: #1c1c1c;
    height: 70px;
    width: 30px;
    line-height: 70px;
    text-align: center;
    border: 1px solid #ebebeb;
    position: absolute;
    left: -35px;
    top: 50%;
    -webkit-transform: translateY(-35px);
    background: #ffffff;
}

.categories__slider.owl-carousel .owl-nav button.owl-next {
    left: auto;
    right: -35px;
}

/*---------------------
    Featured
  -----------------------*/

.featured {
    padding-top: 80px;
    padding-bottom: 40px;
}

.featured__controls {
    text-align: center;
    margin-bottom: 50px;
}

.featured__controls ul li {
    list-style: none;
    font-size: 18px;
    color: #1c1c1c;
    display: inline-block;
    margin-right: 25px;
    position: relative;
    cursor: pointer;
}

.featured__controls ul li.active:after {
    opacity: 1;
}

.featured__controls ul li:after {
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background: #7fad39;
    content: "";
    opacity: 0;
}

.featured__controls ul li:last-child {
    margin-right: 0;
}

.featured__item {
    margin-bottom: 50px;
}

.featured_item:hover .featureditempic .featureditempic_hover {
    bottom: 20px;
}

.featured_item_pic {
    height: 270px;
    position: relative;
    overflow: hidden;
    background-position: center center;
}

.featured_itempic_hover {
    position: absolute;
    left: 0;
    bottom: -50px;
    width: 100%;
    text-align: center;
    -webkit-transition: all, 0.5s;
    -moz-transition: all, 0.5s;
    -ms-transition: all, 0.5s;
    -o-transition: all, 0.5s;
    transition: all, 0.5s;
}

.featured_itempic_hover li {
    list-style: none;
    display: inline-block;
    margin-right: 6px;
}

.featured_itempic_hover li:last-child {
    margin-right: 0;
}

.featured_itempic_hover li:hover a {
    background: #7fad39;
    border-color: #7fad39;
}

.featured_itempic_hover li:hover a i {
    color: #ffffff;
    transform: rotate(360deg);
}

.featured_itempic_hover li a {
    font-size: 16px;
    color: #1c1c1c;
    height: 40px;
    width: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ebebeb;
    background: #ffffff;
    display: block;
    border-radius: 50%;
    -webkit-transition: all, 0.5s;
    -moz-transition: all, 0.5s;
    -ms-transition: all, 0.5s;
    -o-transition: all, 0.5s;
    transition: all, 0.5s;
}

.featured_itempic_hover li a i {
    position: relative;
    transform: rotate(0);
    -webkit-transition: all, 0.3s;
    -moz-transition: all, 0.3s;
    -ms-transition: all, 0.3s;
    -o-transition: all, 0.3s;
    transition: all, 0.3s;
}

.featured_item_text {
    text-align: center;
    padding-top: 15px;
}

.featured_item_text h6 {
    margin-bottom: 10px;
}

.featured_item_text h6 a {
    color: #252525;
}

.featured_item_text h5 {
    color: #252525;
    font-weight: 700;
}

/*---------------------
    Latest Product
  -----------------------*/

.latest-product {
    padding-top: 80px;
    padding-bottom: 0;
}

.latest-product__text h4 {
    font-weight: 700;
    color: #1c1c1c;
    margin-bottom: 45px;
}

.latest-product__slider.owl-carousel .owl-nav {
    position: absolute;
    right: 20px;
    top: -75px;
}

.latest-product__slider.owl-carousel .owl-nav button {
    height: 30px;
    width: 30px;
    background: #F3F6FA;
    border: 1px solid #e6e6e6;
    font-size: 14px;
    color: #636363;
    margin-right: 10px;
    line-height: 30px;
    text-align: center;
}

.latest-product__slider.owl-carousel .owl-nav button span {
    font-weight: 700;
}

.latest-product__slider.owl-carousel .owl-nav button:last-child {
    margin-right: 0;
}

.latest-product__item {
    margin-bottom: 20px;
    overflow: hidden;
    display: block;
}

.latest-product_item_pic {
    float: left;
    margin-right: 26px;
}

.latest-product_item_pic img {
    height: 110px;
    width: 110px;
}

.latest-product_item_text {
    overflow: hidden;
    padding-top: 10px;
}

.latest-product_item_text h6 {
    color: #252525;
    margin-bottom: 8px;
}

.latest-product_item_text span {
    font-size: 18px;
    display: block;
    color: #252525;
    font-weight: 700;
}

/*---------------------
    Form BLog
  -----------------------*/

.from-blog {
    padding-top: 50px;
    padding-bottom: 50px;
}

.from-blog .blog__item {
    margin-bottom: 30px;
}

.from-blog__title {
    margin-bottom: 70px;
}

/*---------------------
    Breadcrumb
  -----------------------*/

.breadcrumb-section {
    display: flex;
    align-items: center;
    padding: 45px 0 40px;
}

.breadcrumb__text h2 {
    font-size: 46px;
    color: #ffffff;
    font-weight: 700;
}

.breadcrumb__option a {
    display: inline-block;
    font-size: 16px;
    color: #ffffff;
    font-weight: 700;
    margin-right: 20px;
    position: relative;
}

.breadcrumb__option a:after {
    position: absolute;
    right: -12px;
    top: 13px;
    height: 1px;
    width: 10px;
    background: #ffffff;
    content: "";
}

.breadcrumb__option span {
    display: inline-block;
    font-size: 16px;
    color: #ffffff;
}

/*---------------------
    Sidebar
  -----------------------*/

.sidebar__item {
    margin-bottom: 35px;
}

.sidebar_item.sidebaritem_color--option {
    overflow: hidden;
}

.sidebar__item h4 {
    color: #1c1c1c;
    font-weight: 700;
    margin-bottom: 25px;
}

.sidebar__item ul li {
    list-style: none;
}

.sidebar__item ul li a {
    font-size: 16px;
    color: #1c1c1c;
    line-height: 39px;
    display: block;
}

.sidebar_item .latest-product_text {
    position: relative;
}

.sidebar_item .latest-product_text h4 {
    margin-bottom: 45px;
}

.sidebar_item .latest-product_text .owl-carousel .owl-nav {
    right: 0;
}

.price-range-wrap .range-slider {
    margin-top: 20px;
}

.price-range-wrap .range-slider .price-input {
    position: relative;
}

.price-range-wrap .range-slider .price-input:after {
    position: absolute;
    left: 38px;
    top: 13px;
    height: 1px;
    width: 5px;
    background: #dd2222;
    content: "";
}

.price-range-wrap .range-slider .price-input input {
    font-size: 16px;
    color: #dd2222;
    font-weight: 700;
    max-width: 20%;
    border: none;
    display: inline-block;
}

.price-range-wrap .price-range {
    border-radius: 0;
}

.price-range-wrap .price-range.ui-widget-content {
    border: none;
    background: #ebebeb;
    height: 5px;
}

.price-range-wrap .price-range.ui-widget-content .ui-slider-handle {
    height: 13px;
    width: 13px;
    border-radius: 50%;
    background: #ffffff;
    border: none;
    -webkit-box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
    outline: none;
    cursor: pointer;
}

.price-range-wrap .price-range .ui-slider-range {
    background: #dd2222;
    border-radius: 0;
}

.price-range-wrap .price-range .ui-slider-range.ui-corner-all.ui-widget-header:last-child {
    background: #dd2222;
}

.sidebar_item_color {
    float: left;
    width: 40%;
}

.sidebar_itemcolor.sidebaritem_color--white label:after {
    border: 2px solid #333333;
    background: transparent;
}

.sidebar_itemcolor.sidebaritem_color--gray label:after {
    background: #E9A625;
}

.sidebar_itemcolor.sidebaritem_color--red label:after {
    background: #D62D2D;
}

.sidebar_itemcolor.sidebaritem_color--black label:after {
    background: #252525;
}

.sidebar_itemcolor.sidebaritem_color--blue label:after {
    background: #249BC8;
}

.sidebar_itemcolor.sidebaritem_color--green label:after {
    background: #3CC032;
}

.sidebar_item_color label {
    font-size: 16px;
    color: #333333;
    position: relative;
    padding-left: 32px;
    cursor: pointer;
}

.sidebar_item_color label input {
    position: absolute;
    visibility: hidden;
}

.sidebar_item_color label:after {
    position: absolute;
    left: 0;
    top: 5px;
    height: 14px;
    width: 14px;
    background: #222;
    content: "";
    border-radius: 50%;
}

.sidebar_item_size {
    display: inline-block;
    margin-right: 16px;
    margin-bottom: 10px;
}

.sidebar_item_size label {
    font-size: 12px;
    color: #6f6f6f;
    display: inline-block;
    padding: 8px 25px 6px;
    background: #f5f5f5;
    cursor: pointer;
    margin-bottom: 0;
}

.sidebar_item_size label input {
    position: absolute;
    visibility: hidden;
}

/*---------------------
    Shop Grid
  -----------------------*/

.product {
    padding-top: 80px;
    padding-bottom: 80px;
}

.product__discount {
    padding-bottom: 50px;
}

.product_discount_title {
    text-align: left;
    margin-bottom: 65px;
}

.product_discount_title h2 {
    display: inline-block;
}

.product_discount_title h2:after {
    margin: 0;
    width: 100%;
}

.product_discountitem:hover .productdiscountitempic .productitempic_hover {
    bottom: 20px;
}

.product_discountitem_pic {
    height: 270px;
    position: relative;
    overflow: hidden;
    width: 225px;
}

.product_discountitempic .productdiscount_percent {
    height: 45px;
    width: 45px;
    background: #dd2222;
    border-radius: 50%;
    font-size: 14px;
    color: #ffffff;
    line-height: 45px;
    text-align: center;
    position: absolute;
    left: 15px;
    top: 15px;
}

.product_itempic_hover {
    position: absolute;
    left: 0;
    bottom: -50px;
    width: 100%;
    text-align: center;
    -webkit-transition: all, 0.5s;
    -moz-transition: all, 0.5s;
    -ms-transition: all, 0.5s;
    -o-transition: all, 0.5s;
    transition: all, 0.5s;
}

.product_itempic_hover li {
    list-style: none;
    display: inline-block;
    margin-right: 6px;
}

.product_itempic_hover li:last-child {
    margin-right: 0;
}

.product_itempic_hover li:hover a {
    background: #7fad39;
    border-color: #7fad39;
}

.product_itempic_hover li:hover a i {
    color: #ffffff;
    transform: rotate(360deg);
}

.product_itempic_hover li a {
    font-size: 16px;
    color: #1c1c1c;
    height: 40px;
    width: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ebebeb;
    background: #ffffff;
    display: block;
    border-radius: 50%;
    -webkit-transition: all, 0.5s;
    -moz-transition: all, 0.5s;
    -ms-transition: all, 0.5s;
    -o-transition: all, 0.5s;
    transition: all, 0.5s;
}

.product_itempic_hover li a i {
    position: relative;
    transform: rotate(0);
    -webkit-transition: all, 0.3s;
    -moz-transition: all, 0.3s;
    -ms-transition: all, 0.3s;
    -o-transition: all, 0.3s;
    transition: all, 0.3s;
}

.product_discountitem_text {
    text-align: center;
    padding-top: 20px;
}

.product_discountitem_text span {
    font-size: 14px;
    color: #b2b2b2;
    display: block;
    margin-bottom: 4px;
}

.product_discountitem_text h5 {
    margin-bottom: 6px;
}

.product_discountitem_text h5 a {
    color: #1c1c1c;
}

.product_discountitemtext .productitem_price {
    font-size: 18px;
    color: #1c1c1c;
    font-weight: 700;
}

.product_discountitemtext .productitem_price span {
    display: inline-block;
    font-weight: 400;
    text-decoration: line-through;
    margin-left: 10px;
}

.product_discount_slider .col-lg-4 {
    max-width: 100%;
}

.product_discount_slider.owl-carousel .owl-dots {
    text-align: center;
    margin-top: 30px;
}

.product_discount_slider.owl-carousel .owl-dots button {
    height: 12px;
    width: 12px;
    border: 1px solid #b2b2b2;
    border-radius: 50%;
    margin-right: 12px;
}

.product_discount_slider.owl-carousel .owl-dots button.active {
    background: #707070;
    border-color: #6f6f6f;
}

.product_discount_slider.owl-carousel .owl-dots button:last-child {
    margin-right: 0;
}

.filter__item {
    padding-top: 45px;
    border-top: 1px solid #ebebeb;
    padding-bottom: 20px;
}

.filter__sort {
    margin-bottom: 15px;
}

.filter__sort span {
    font-size: 16px;
    color: #6f6f6f;
    display: inline-block;
}

.filter__sort .nice-select {
    background-color: #fff;
    border-radius: 0;
    border: none;
    display: inline-block;
    float: none;
    height: 0;
    line-height: 0;
    padding-left: 18px;
    padding-right: 30px;
    font-size: 16px;
    color: #1c1c1c;
    font-weight: 700;
    cursor: pointer;
}

.filter__sort .nice-select span {
    color: #1c1c1c;
}

.filter__sort .nice-select:after {
    border-bottom: 1.5px solid #1c1c1c;
    border-right: 1.5px solid #1c1c1c;
    height: 8px;
    margin-top: 0;
    right: 16px;
    width: 8px;
    top: -5px;
}

.filter__sort .nice-select.open .list {
    opacity: 1;
    pointer-events: auto;
    -webkit-transform: scale(1) translateY(0);
    -ms-transform: scale(1) translateY(0);
    transform: scale(1) translateY(0);
}

.filter__sort .nice-select .list {
    border-radius: 0;
    margin-top: 0;
    top: 15px;
}

.filter__sort .nice-select .option {
    line-height: 30px;
    min-height: 30px;
}

.filter__found {
    text-align: center;
    margin-bottom: 15px;
}

.filter__found h6 {
    font-size: 16px;
    color: #b2b2b2;
}

.filter__found h6 span {
    color: #1c1c1c;
    font-weight: 700;
    margin-right: 5px;
}

.filter__option {
    text-align: right;
    margin-bottom: 15px;
}

.filter__option span {
    font-size: 24px;
    color: #b2b2b2;
    margin-right: 10px;
    cursor: pointer;
    -webkit-transition: all, 0.3s;
    -moz-transition: all, 0.3s;
    -ms-transition: all, 0.3s;
    -o-transition: all, 0.3s;
    transition: all, 0.3s;
}

.filter__option span:last-child {
    margin: 0;
}

.filter__option span:hover {
    color: #7fad39;
}

.product__item {
    margin-bottom: 50px;
}

.product_item:hover .productitempic .productitempic_hover {
    bottom: 20px;
}

.product_item_pic {
    height: 270px;
    position: relative;
    overflow: hidden;
}

.product_itempic_hover {
    position: absolute;
    left: 0;
    bottom: -50px;
    width: 100%;
    text-align: center;
    -webkit-transition: all, 0.5s;
    -moz-transition: all, 0.5s;
    -ms-transition: all, 0.5s;
    -o-transition: all, 0.5s;
    transition: all, 0.5s;
}

.product_itempic_hover li {
    list-style: none;
    display: inline-block;
    margin-right: 6px;
}

.product_itempic_hover li:last-child {
    margin-right: 0;
}

.product_itempic_hover li:hover a {
    background: #7fad39;
    border-color: #7fad39;
}

.product_itempic_hover li:hover a i {
    color: #ffffff;
    transform: rotate(360deg);
}

.product_itempic_hover li a {
    font-size: 16px;
    color: #1c1c1c;
    height: 40px;
    width: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ebebeb;
    background: #ffffff;
    display: block;
    border-radius: 50%;
    -webkit-transition: all, 0.5s;
    -moz-transition: all, 0.5s;
    -ms-transition: all, 0.5s;
    -o-transition: all, 0.5s;
    transition: all, 0.5s;
}

.product_itempic_hover li a i {
    position: relative;
    transform: rotate(0);
    -webkit-transition: all, 0.3s;
    -moz-transition: all, 0.3s;
    -ms-transition: all, 0.3s;
    -o-transition: all, 0.3s;
    transition: all, 0.3s;
}

.product_item_text {
    text-align: center;
    padding-top: 15px;
}

.product_item_text h6 {
    margin-bottom: 10px;
}

.product_item_text h6 a {
    color: #252525;
}

.product_item_text h5 {
    color: #252525;
    font-weight: 700;
}

.product__pagination,
.blog__pagination {
    padding-top: 10px;
}

.product__pagination a,
.blog__pagination a {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #b2b2b2;
    font-size: 14px;
    color: #b2b2b2;
    font-weight: 700;
    line-height: 28px;
    text-align: center;
    margin-right: 16px;
    -webkit-transition: all, 0.3s;
    -moz-transition: all, 0.3s;
    -ms-transition: all, 0.3s;
    -o-transition: all, 0.3s;
    transition: all, 0.3s;
}

.product__pagination a:hover,
.blog__pagination a:hover {
    background: #7fad39;
    border-color: #7fad39;
    color: #ffffff;
}

.product__pagination a:last-child,
.blog__pagination a:last-child {
    margin-right: 0;
}

/*---------------------
    Shop Details
  -----------------------*/

.product-details {
    padding-top: 80px;
}

.product_detailspic_item {
    margin-bottom: 20px;
}

.product_detailspic_item img {
    min-width: 100%;
}

.product_detailspic_slider img {
    cursor: pointer;
}

.product_detailspic_slider.owl-carousel .owl-item img {
    width: auto;
}

.product_details_text h3 {
    color: #252525;
    font-weight: 700;
    margin-bottom: 16px;
}

.product_detailstext .productdetails_rating {
    font-size: 14px;
    margin-bottom: 12px;
}

.product_detailstext .productdetails_rating i {
    margin-right: -2px;
    color: #EDBB0E;
}

.product_detailstext .productdetails_rating span {
    color: #dd2222;
    margin-left: 4px;
}

.product_detailstext .productdetails_price {
    font-size: 30px;
    color: #dd2222;
    font-weight: 600;
    margin-bottom: 15px;
}

.product_details_text p {
    margin-bottom: 45px;
}

.product_details_text .primary-btn {
    padding: 16px 28px 14px;
    margin-right: 6px;
    margin-bottom: 5px;
}

.product_details_text .heart-icon {
    display: inline-block;
    font-size: 16px;
    color: #6f6f6f;
    padding: 13px 16px 13px;
    background: #f5f5f5;
}

.product_details_text ul {
    border-top: 1px solid #ebebeb;
    padding-top: 40px;
    margin-top: 50px;
}

.product_details_text ul li {
    font-size: 16px;
    color: #1c1c1c;
    list-style: none;
    line-height: 36px;
}

.product_details_text ul li b {
    font-weight: 700;
    width: 170px;
    display: inline-block;
}

.product_details_text ul li span samp {
    color: #dd2222;
}

.product_details_text ul li .share {
    display: inline-block;
}

.product_details_text ul li .share a {
    display: inline-block;
    font-size: 15px;
    color: #1c1c1c;
    margin-right: 25px;
}

.product_details_text ul li .share a:last-child {
    margin-right: 0;
}

.product_details_quantity {
    display: inline-block;
    margin-right: 6px;
}

.pro-qty {
    width: 140px;
    height: 50px;
    display: inline-block;
    position: relative;
    text-align: center;
    background: #f5f5f5;
    margin-bottom: 5px;
}

.pro-qty input {
    height: 100%;
    width: 100%;
    font-size: 16px;
    color: #6f6f6f;
    width: 50px;
    border: none;
    background: #f5f5f5;
    text-align: center;
}

.pro-qty .qtybtn {
    width: 35px;
    font-size: 16px;
    color: #6f6f6f;
    cursor: pointer;
    display: inline-block;
}

.product_details_tab {
    padding-top: 85px;
}

.product_details_tab .nav-tabs {
    border-bottom: none;
    justify-content: center;
    position: relative;
}

.product_details_tab .nav-tabs:before {
    position: absolute;
    left: 0;
    top: 12px;
    height: 1px;
    width: 370px;
    background: #ebebeb;
    content: "";
}

.product_details_tab .nav-tabs:after {
    position: absolute;
    right: 0;
    top: 12px;
    height: 1px;
    width: 370px;
    background: #ebebeb;
    content: "";
}

.product_details_tab .nav-tabs li {
    margin-bottom: 0;
    margin-right: 65px;
}

.product_details_tab .nav-tabs li:last-child {
    margin-right: 0;
}

.product_details_tab .nav-tabs li a {
    font-size: 16px;
    color: #999999;
    font-weight: 700;
    border: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 0;
}

.product_detailstab .productdetailstab_desc {
    padding-top: 44px;
}

.product_detailstab .productdetailstab_desc h6 {
    font-weight: 700;
    color: #333333;
    margin-bottom: 26px;
}

.product_detailstab .productdetailstab_desc p {
    color: #666666;
}

/*---------------------
    Shop Details
  -----------------------*/

.related-product {
    padding-bottom: 30px;
}

.related_product_title {
    margin-bottom: 70px;
}

/*---------------------
    Shop Cart
  -----------------------*/

.shoping-cart {
    padding-top: 80px;
    padding-bottom: 80px;
}

.shoping_cart_table {
    margin-bottom: 30px;
}

.shoping_cart_table table {
    width: 100%;
    text-align: center;
}

.shoping_cart_table table thead tr {
    border-bottom: 1px solid #ebebeb;
}

.shoping_cart_table table thead th {
    font-size: 20px;
    font-weight: 700;
    color: #1c1c1c;
    padding-bottom: 20px;
}

.shoping_carttable table thead th.shoping_product {
    text-align: left;
}

.shoping_cart_table table tbody tr td {
    padding-top: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #ebebeb;
}

.shoping_carttable table tbody tr td.shopingcart_item {
    width: 630px;
    text-align: left;
}

.shoping_carttable table tbody tr td.shopingcart_item img {
    display: inline-block;
    margin-right: 25px;
}

.shoping_carttable table tbody tr td.shopingcart_item h5 {
    color: #1c1c1c;
    display: inline-block;
}

.shoping_carttable table tbody tr td.shopingcart_price {
    font-size: 18px;
    color: #1c1c1c;
    font-weight: 700;
    width: 100px;
}

.shoping_carttable table tbody tr td.shopingcart_total {
    font-size: 18px;
    color: #1c1c1c;
    font-weight: 700;
    width: 110px;
}

.shoping_carttable table tbody tr td.shopingcartitem_close {
    text-align: right;
}

.shoping_carttable table tbody tr td.shopingcartitem_close span {
    font-size: 24px;
    color: #b2b2b2;
    cursor: pointer;
}

.shoping_carttable table tbody tr td.shopingcart_quantity {
    width: 225px;
}

.shoping_carttable table tbody tr td.shopingcart_quantity .pro-qty {
    width: 120px;
    height: 40px;
}

.shoping_carttable table tbody tr td.shopingcart_quantity .pro-qty input {
    color: #1c1c1c;
}

.shoping_carttable table tbody tr td.shopingcart_quantity .pro-qty input::placeholder {
    color: #1c1c1c;
}

.shoping_carttable table tbody tr td.shopingcart_quantity .pro-qty .qtybtn {
    width: 15px;
}

.primary-btn.cart-btn {
    color: #6f6f6f;
    padding: 14px 30px 12px;
    background: #f5f5f5;
}

.primary-btn.cart-btn span {
    font-size: 14px;
}

.primary-btn.cart-btn.cart-btn-right {
    float: right;
}

.shoping__discount {
    margin-top: 45px;
}

.shoping__discount h5 {
    font-size: 20px;
    color: #1c1c1c;
    font-weight: 700;
    margin-bottom: 25px;
}

.shoping__discount form input {
    width: 255px;
    height: 46px;
    border: 1px solid #cccccc;
    font-size: 16px;
    color: #b2b2b2;
    text-align: center;
    display: inline-block;
    margin-right: 15px;
}

.shoping__discount form input::placeholder {
    color: #b2b2b2;
}

.shoping__discount form button {
    padding: 15px 30px 11px;
    font-size: 12px;
    letter-spacing: 4px;
    background: #6f6f6f;
}

.shoping__checkout {
    background: #f5f5f5;
    padding: 30px;
    padding-top: 20px;
    margin-top: 50px;
}

.shoping__checkout h5 {
    color: #1c1c1c;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 28px;
}

.shoping__checkout ul {
    margin-bottom: 28px;
}

.shoping__checkout ul li {
    font-size: 16px;
    color: #1c1c1c;
    font-weight: 700;
    list-style: none;
    overflow: hidden;
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 13px;
    margin-bottom: 18px;
}

.shoping__checkout ul li:last-child {
    padding-bottom: 0;
    border-bottom: none;
    margin-bottom: 0;
}

.shoping__checkout ul li span {
    font-size: 18px;
    color: #dd2222;
    float: right;
}

.shoping__checkout .primary-btn {
    display: block;
    text-align: center;
}

/*---------------------
    Checkout
  -----------------------*/

.checkout {
    padding-top: 80px;
    padding-bottom: 60px;
}

.checkout h6 {
    color: #999999;
    text-align: center;
    background: #f5f5f5;
    border-top: 1px solid #6AB963;
    padding: 12px 0 12px;
    margin-bottom: 75px;
}

.checkout h6 span {
    font-size: 16px;
    color: #6AB963;
    margin-right: 5px;
}

.checkout h6 a {
    text-decoration: underline;
    color: #999999;
}

.checkout__form h4 {
    color: #1c1c1c;
    font-weight: 700;
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 20px;
    margin-bottom: 25px;
}

.checkout__form p {
    column-rule: #b2b2b2;
}

.checkout__input {
    margin-bottom: 24px;
}

.checkout__input p {
    color: #1c1c1c;
    margin-bottom: 20px;
}

.checkout__input p span {
    color: #dd2222;
}

.checkout__input input {
    width: 100%;
    height: 46px;
    border: 1px solid #ebebeb;
    padding-left: 20px;
    font-size: 16px;
    color: #b2b2b2;
    border-radius: 4px;
}

.checkout_input input.checkoutinput_add {
    margin-bottom: 20px;
}

.checkout__input input::placeholder {
    color: #b2b2b2;
}

.checkout_input_checkbox {
    margin-bottom: 10px;
}

.checkout_input_checkbox label {
    position: relative;
    font-size: 16px;
    color: #1c1c1c;
    padding-left: 40px;
    cursor: pointer;
}

.checkout_input_checkbox label input {
    position: absolute;
    visibility: hidden;
}

.checkout_input_checkbox label input:checked~.checkmark {
    background: #7fad39;
    border-color: #7fad39;
}

.checkout_input_checkbox label input:checked~.checkmark:after {
    opacity: 1;
}

.checkout_input_checkbox label .checkmark {
    position: absolute;
    left: 0;
    top: 4px;
    height: 16px;
    width: 14px;
    border: 1px solid #a6a6a6;
    content: "";
    border-radius: 4px;
}

.checkout_input_checkbox label .checkmark:after {
    position: absolute;
    left: 1px;
    top: 1px;
    width: 10px;
    height: 8px;
    border: solid white;
    border-width: 3px 3px 0px 0px;
    -webkit-transform: rotate(127deg);
    -ms-transform: rotate(127deg);
    transform: rotate(127deg);
    content: "";
    opacity: 0;
}

.checkout__order {
    background: #f5f5f5;
    padding: 40px;
    padding-top: 30px;
}

.checkout__order h4 {
    color: #1c1c1c;
    font-weight: 700;
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 20px;
    margin-bottom: 20px;
}

.checkout_order .checkoutorder_products {
    font-size: 18px;
    color: #1c1c1c;
    font-weight: 700;
    margin-bottom: 10px;
}

.checkout_order .checkoutorder_products span {
    float: right;
}

.checkout__order ul {
    margin-bottom: 12px;
}

.checkout__order ul li {
    font-size: 16px;
    color: #6f6f6f;
    line-height: 40px;
    list-style: none;
}

.checkout__order ul li span {
    font-weight: 700;
    float: right;
}

.checkout_order .checkoutorder_subtotal {
    font-size: 18px;
    color: #1c1c1c;
    font-weight: 700;
    border-bottom: 1px solid #e1e1e1;
    border-top: 1px solid #e1e1e1;
    padding-bottom: 15px;
    margin-bottom: 15px;
    padding-top: 15px;
}

.checkout_order .checkoutorder_subtotal span {
    float: right;
}

.checkout_order .checkoutinput_checkbox label {
    padding-left: 20px;
}

.checkout_order .checkoutorder_total {
    font-size: 18px;
    color: #1c1c1c;
    font-weight: 700;
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 15px;
    margin-bottom: 25px;
}

.checkout_order .checkoutorder_total span {
    float: right;
    color: #dd2222;
}

.checkout__order button {
    font-size: 18px;
    letter-spacing: 2px;
    width: 100%;
    margin-top: 10px;
}

/*---------------------
    Blog
  -----------------------*/

.blog__item {
    margin-bottom: 60px;
}

.blog_item_pic img {
    min-width: 100%;
}

.blog_item_text {
    padding-top: 25px;
}

.blog_item_text ul {
    margin-bottom: 15px;
}

.blog_item_text ul li {
    font-size: 16px;
    color: #b2b2b2;
    list-style: none;
    display: inline-block;
    margin-right: 15px;
}

.blog_item_text ul li:last-child {
    margin-right: 0;
}

.blog_item_text h5 {
    margin-bottom: 12px;
}

.blog_item_text h5 a {
    font-size: 20px;
    color: #1c1c1c;
    font-weight: 700;
}

.blog_item_text p {
    margin-bottom: 25px;
}

.blog_itemtext .blog_btn {
    display: inline-block;
    font-size: 14px;
    color: #1c1c1c;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 1px solid #b2b2b2;
    padding: 14px 20px 12px;
    border-radius: 25px;
}

.blog_itemtext .blog_btn span {
    position: relative;
    top: 1px;
    margin-left: 5px;
}

.blog__pagination {
    padding-top: 5px;
    position: relative;
}

.blog__pagination:before {
    position: absolute;
    left: 0;
    top: -29px;
    height: 1px;
    width: 100%;
    background: #000000;
    opacity: 0.1;
    content: "";
}

/*---------------------
    Blog Sidebar
  -----------------------*/

.blog__sidebar {
    padding-top: 50px;
}

.blog_sidebar_item {
    margin-bottom: 50px;
}

.blog_sidebar_item h4 {
    color: #1c1c1c;
    font-weight: 700;
    margin-bottom: 25px;
}

.blog_sidebar_item ul li {
    list-style: none;
}

.blog_sidebar_item ul li a {
    font-size: 16px;
    color: #666666;
    line-height: 48px;
    -webkit-transition: all, 0.3s;
    -moz-transition: all, 0.3s;
    -ms-transition: all, 0.3s;
    -o-transition: all, 0.3s;
    transition: all, 0.3s;
}

.blog_sidebar_item ul li a:hover {
    color: #7fad39;
}

.blog_sidebar_search {
    margin-bottom: 50px;
}

.blog_sidebar_search form {
    position: relative;
}

.blog_sidebar_search form input {
    width: 100%;
    height: 46px;
    font-size: 16px;
    color: #6f6f6f;
    padding-left: 15px;
    border: 1px solid #e1e1e1;
    border-radius: 20px;
}

.blog_sidebar_search form input::placeholder {
    color: #6f6f6f;
}

.blog_sidebar_search form button {
    font-size: 16px;
    color: #6f6f6f;
    background: transparent;
    border: none;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    padding: 0px 18px;
}

.blog_sidebarrecent .blogsidebarrecent_item {
    display: block;
}

.blog_sidebarrecent .blogsidebarrecent_item:last-child {
    margin-bottom: 0;
}

.blog_sidebarrecent_item {
    overflow: hidden;
    margin-bottom: 20px;
}

.blog_sidebarrecentitem_pic {
    float: left;
    margin-right: 20px;
}

.blog_sidebarrecentitem_text {
    overflow: hidden;
}

.blog_sidebarrecentitem_text h6 {
    font-weight: 700;
    color: #333333;
    line-height: 20px;
    margin-bottom: 5px;
}

.blog_sidebarrecentitem_text span {
    font-size: 12px;
    color: #999999;
    text-transform: uppercase;
}

.blog_sidebaritem_tags a {
    font-size: 16px;
    color: #6f6f6f;
    background: #f5f5f5;
    display: inline-block;
    padding: 7px 26px 5px;
    margin-right: 6px;
    margin-bottom: 10px;
}

/*---------------------
    Blog Details Hero
  -----------------------*/

.blog-details-hero {
    height: 350px;
    display: flex;
    align-items: center;
}

.blog_detailshero_text {
    text-align: center;
}

.blog_detailshero_text h2 {
    font-size: 46px;
    color: #ffffff;
    font-weight: 700;
    margin-bottom: 10px;
}

.blog_detailshero_text ul li {
    font-size: 16px;
    color: #ffffff;
    list-style: none;
    display: inline-block;
    margin-right: 45px;
    position: relative;
}

.blog_detailshero_text ul li:after {
    position: absolute;
    right: -26px;
    top: 0;
    content: "|";
}

.blog_detailshero_text ul li:last-child {
    margin-right: 0;
}

.blog_detailshero_text ul li:last-child:after {
    display: none;
}

/*---------------------
    Blog Details
  -----------------------*/

.related-blog {
    padding-top: 70px;
    padding-bottom: 10px;
}

.related-blog-title {
    margin-bottom: 70px;
}

.blog-details {
    padding-bottom: 75px;
    border-bottom: 1px solid #e1e1e1;
}

.blog_details_text {
    margin-bottom: 45px;
}

.blog_details_text img {
    margin-bottom: 30px;
}

.blog_details_text p {
    font-size: 18px;
    line-height: 30px;
}

.blog_details_text h3 {
    color: #333333;
    font-weight: 700;
    line-height: 30px;
    margin-bottom: 30px;
}

.blog_detailsauthor_pic {
    float: left;
    margin-right: 15px;
}

.blog_detailsauthor_pic img {
    height: 92px;
    width: 92px;
    border-radius: 50%;
}

.blog_detailsauthor_text {
    overflow: hidden;
    padding-top: 30px;
}

.blog_detailsauthor_text h6 {
    color: #1c1c1c;
    font-weight: 700;
}

.blog_detailsauthor_text span {
    font-size: 16px;
    color: #6f6f6f;
}

.blog_details_widget ul {
    margin-bottom: 5px;
}

.blog_details_widget ul li {
    font-size: 16px;
    color: #6f6f6f;
    list-style: none;
    line-height: 30px;
}

.blog_details_widget ul li span {
    color: #1c1c1c;
    font-weight: 700;
}

.blog_detailswidget .blogdetails_social a {
    display: inline-block;
    font-size: 20px;
    color: #6f6f6f;
    margin-right: 24px;
    -webkit-transition: all, 0.3s;
    -moz-transition: all, 0.3s;
    -ms-transition: all, 0.3s;
    -o-transition: all, 0.3s;
    transition: all, 0.3s;
}

.blog_detailswidget .blogdetails_social a:hover {
    color: #7fad39;
}

.blog_detailswidget .blogdetails_social a:last-child {
    margin-right: 0;
}

/*---------------------
    Footer
  -----------------------*/

.footer {
    background: #F3F6FA;
    padding-top: 70px;
    padding-bottom: 0;
}

.footer__about {
    margin-bottom: 30px;
}

.footer__about ul li {
    font-size: 16px;
    color: #1c1c1c;
    line-height: 36px;
    list-style: none;
}

.footer_about_logo {
    margin-bottom: 15px;
}

.footer_about_logo a {
    display: inline-block;
}

.footer__widget {
    margin-bottom: 30px;
    overflow: hidden;
}

.footer__widget h6 {
    color: #1c1c1c;
    font-weight: 700;
    margin-bottom: 10px;
}

.footer__widget ul {
    width: 50%;
    float: left;
}

.footer__widget ul li {
    list-style: none;
}

.footer__widget ul li a {
    color: #1c1c1c;
    font-size: 14px;
    line-height: 32px;
}

.footer__widget p {
    font-size: 14px;
    color: #1c1c1c;
    margin-bottom: 30px;
}

.footer__widget form {
    position: relative;
    margin-bottom: 30px;
}

.footer__widget form input {
    width: 100%;
    font-size: 16px;
    padding-left: 20px;
    color: #1c1c1c;
    height: 46px;
    border: 1px solid #ededed;
}

.footer__widget form input::placeholder {
    color: #1c1c1c;
}

.footer__widget form button {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0 26px;
    height: 100%;
}

.footer_widget .footerwidget_social a {
    display: inline-block;
    height: 41px;
    width: 41px;
    font-size: 16px;
    color: #404040;
    border: 1px solid #ededed;
    border-radius: 50%;
    line-height: 38px;
    text-align: center;
    background: #ffffff;
    -webkit-transition: all, 0.3s;
    -moz-transition: all, 0.3s;
    -ms-transition: all, 0.3s;
    -o-transition: all, 0.3s;
    transition: all, 0.3s;
    margin-right: 10px;
}

.footer_widget .footerwidget_social a:last-child {
    margin-right: 0;
}

.footer_widget .footerwidget_social a:hover {
    background: #7fad39;
    color: #ffffff;
    border-color: #ffffff;
}

.footer__copyright {
    border-top: 1px solid #ebebeb;
    padding: 15px 0;
    overflow: hidden;
    margin-top: 20px;
}

.footer_copyright_text {
    font-size: 14px;
    color: #1c1c1c;
    float: left;
    line-height: 25px;
}

.footer_copyright_payment {
    float: right;
}

/*---------------------
    Contact
  -----------------------*/

.contact {
    padding-top: 80px;
    padding-bottom: 50px;
}

.contact__widget {
    margin-bottom: 30px;
}

.contact__widget span {
    font-size: 36px;
    color: #7fad39;
}

.contact__widget h4 {
    color: #1c1c1c;
    font-weight: 700;
    margin-bottom: 6px;
    margin-top: 18px;
}

.contact__widget p {
    color: #666666;
    margin-bottom: 0;
}

/*---------------------
    Map
  -----------------------*/

.map {
    height: 500px;
    position: relative;
}

.map iframe {
    width: 100%;
}

.map .map-inside {
    position: absolute;
    left: 50%;
    top: 160px;
    -webkit-transform: translateX(-175px);
    -ms-transform: translateX(-175px);
    transform: translateX(-175px);
}

.map .map-inside i {
    font-size: 48px;
    color: #7fad39;
    position: absolute;
    bottom: -75px;
    left: 50%;
    -webkit-transform: translateX(-18px);
    -ms-transform: translateX(-18px);
    transform: translateX(-18px);
}

.map .map-inside .inside-widget {
    width: 350px;
    background: #ffffff;
    text-align: center;
    padding: 23px 0;
    position: relative;
    z-index: 1;
    -webkit-box-shadow: 0 0 20px 5px rgba(12, 7, 26, 0.15);
    box-shadow: 0 0 20px 5px rgba(12, 7, 26, 0.15);
}

.map .map-inside .inside-widget:after {
    position: absolute;
    left: 50%;
    bottom: -30px;
    -webkit-transform: translateX(-6px);
    -ms-transform: translateX(-6px);
    transform: translateX(-6px);
    border: 12px solid transparent;
    border-top: 30px solid #ffffff;
    content: "";
    z-index: -1;
}

.map .map-inside .inside-widget h4 {
    font-size: 22px;
    font-weight: 700;
    color: #1c1c1c;
    margin-bottom: 4px;
}

.map .map-inside .inside-widget ul li {
    list-style: none;
    font-size: 16px;
    color: #666666;
    line-height: 26px;
}

/*---------------------
    Contact Form
  -----------------------*/

.contact_form_title {
    margin-bottom: 50px;
    text-align: center;
}

.contact_form_title h2 {
    color: #1c1c1c;
    font-weight: 700;
}

.contact-form {
    padding-top: 80px;
    padding-bottom: 80px;
}

.contact-form form input {
    width: 100%;
    height: 50px;
    font-size: 16px;
    color: #6f6f6f;
    padding-left: 20px;
    margin-bottom: 30px;
    border: 1px solid #ebebeb;
    border-radius: 4px;
}

.contact-form form input::placeholder {
    color: #6f6f6f;
}

.contact-form form textarea {
    width: 100%;
    height: 150px;
    font-size: 16px;
    color: #6f6f6f;
    padding-left: 20px;
    margin-bottom: 24px;
    border: 1px solid #ebebeb;
    border-radius: 4px;
    padding-top: 12px;
    resize: none;
}

.contact-form form textarea::placeholder {
    color: #6f6f6f;
}

.contact-form form button {
    font-size: 18px;
    letter-spacing: 2px;
}

/*--------------------------------- Responsive Media Quaries -----------------------------*/

@media only screen and (min-width: 1200px) {
    .container {
        max-width: 1170px;
    }
}

/* Medium Device = 1200px */

@media only screen and (min-width: 992px) and (max-width: 1199px) {
    .header__menu ul li {
        margin-right: 45px;
    }

    .hero_search_form {
        width: 490px;
    }

    .hero_categories_all {
        padding: 10px 25px 10px 20px;
    }

    .hero__categories ul {
        padding-left: 20px;
    }

    .latest-product__slider.owl-carousel .owl-nav {
        right: 0;
    }

    .product_details_tab .nav-tabs:before {
        width: 265px;
    }

    .product_details_tab .nav-tabs:after {
        width: 265px;
    }

    .shoping__discount form input {
        width: 240px;
    }
}

/* Tablet Device = 768px */

@media only screen and (min-width: 768px) and (max-width: 991px) {
    .hero__categories {
        margin-bottom: 30px;
    }

    .hero_search_form {
        width: 485px;
    }

    .categories__slider.owl-carousel .owl-nav button {
        left: -20px;
    }

    .categories__slider.owl-carousel .owl-nav button.owl-next {
        right: -20px;
    }

    .filter__sort .nice-select {
        padding-left: 5px;
        padding-right: 28px;
    }

    .product_details_quantity {
        margin-bottom: 10px;
    }

    .product_details_text .primary-btn {
        margin-bottom: 10px;
    }

    .product_details_tab .nav-tabs:before {
        width: 150px;
    }

    .product_details_tab .nav-tabs:after {
        width: 150px;
    }

    .blog_details_author {
        overflow: hidden;
        margin-bottom: 25px;
    }

    .humberger__open {
        display: block;
        font-size: 22px;
        color: #1c1c1c;
        height: 35px;
        width: 35px;
        line-height: 33px;
        text-align: center;
        border: 1px solid #1c1c1c;
        cursor: pointer;
        position: absolute;
        right: 15px;
        top: 22px;
    }

    .header .container {
        position: relative;
    }

    .humberger_menu_wrapper {
        width: 300px;
        background: #ffffff;
        position: fixed;
        left: -300px;
        top: 0;
        height: 100%;
        overflow-y: auto;
        z-index: 99;
        padding: 30px;
        padding-top: 50px;
        opacity: 0;
        display: block;
        -webkit-transition: all, 0.6s;
        -moz-transition: all, 0.6s;
        -ms-transition: all, 0.6s;
        -o-transition: all, 0.6s;
        transition: all, 0.6s;
    }

    .humberger_menuwrapper.showhumbergermenu_wrapper {
        opacity: 1;
        left: 0;
    }

    .humberger_menu_logo {
        margin-bottom: 30px;
    }

    .humberger_menu_logo a {
        display: inline-block;
    }

    .humberger_menu_contact {
        padding: 10px 0 13px;
    }

    .humberger_menu_contact ul li {
        font-size: 14px;
        color: #1c1c1c;
        position: relative;
        line-height: 30px;
        list-style: none;
    }

    .humberger_menu_contact ul li i {
        color: #252525;
        margin-right: 5px;
    }

    .humberger_menu_cart ul {
        display: inline-block;
        margin-right: 25px;
    }

    .humberger_menu_cart ul li {
        list-style: none;
        display: inline-block;
        margin-right: 15px;
    }

    .humberger_menu_cart ul li:last-child {
        margin-right: 0;
    }

    .humberger_menu_cart ul li a {
        position: relative;
    }

    .humberger_menu_cart ul li a i {
        font-size: 18px;
        color: #1c1c1c;
    }

    .humberger_menu_cart ul li a span {
        height: 13px;
        width: 13px;
        background: #7fad39;
        font-size: 10px;
        color: #ffffff;
        line-height: 13px;
        text-align: center;
        font-weight: 700;
        display: inline-block;
        border-radius: 50%;
        position: absolute;
        top: 0;
        right: -12px;
    }

    .humberger_menucart .headercart_price {
        font-size: 14px;
        color: #6f6f6f;
        display: inline-block;
    }

    .humberger_menucart .headercart_price span {
        color: #252525;
        font-weight: 700;
    }

    .humberger_menu_cart {
        margin-bottom: 25px;
    }

    .humberger_menu_widget {
        margin-bottom: 20px;
    }

    .humberger_menuwidget .headertopright_language {
        margin-right: 20px;
    }

    .humberger_menu_nav {
        display: none;
    }

    .humberger_menuwrapper .headertopright_social {
        display: block;
        margin-right: 0;
        margin-bottom: 20px;
    }

    .humberger_menu_wrapper .slicknav_btn {
        display: none;
    }

    .humberger_menu_wrapper .slicknav_nav .slicknav_item a {
        border-bottom: none !important;
    }

    .humberger_menu_wrapper .slicknav_nav {
        display: block !important;
    }

    .humberger_menu_wrapper .slicknav_menu {
        background: transparent;
        padding: 0;
        margin-bottom: 30px;
    }

    .humberger_menu_wrapper .slicknav_nav ul {
        margin: 0;
    }

    .humberger_menu_wrapper .slicknav_nav a {
        color: #1c1c1c;
        font-size: 16px;
        font-weight: 600;
        margin: 0;
        border-bottom: 1px solid #e1e1e1;
    }

    .humberger_menu_wrapper .slicknav_nav a:hover {
        -webkit-border-radius: 0;
        border-radius: 0;
        background: transparent;
        color: #7fad39;
    }

    .humberger_menu_wrapper .slicknav_nav .slicknav_row,
    .humberger_menu_wrapper .slicknav_nav a {
        padding: 8px 0;
    }

    .humberger_menu_overlay {
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        content: "";
        z-index: 98;
        visibility: hidden;
        -webkit-transition: all, 0.6s;
        -moz-transition: all, 0.6s;
        -ms-transition: all, 0.6s;
        -o-transition: all, 0.6s;
        transition: all, 0.6s;
    }

    .humberger_menu_overlay.active {
        visibility: visible;
    }

    .header__top {
        display: none;
    }

    .header__menu {
        display: none;
    }

    .header__cart {
        text-align: center;
        padding: 10px 0 24px;
    }

    .over_hid {
        overflow: hidden;
    }
}

/* Wide Mobile = 480px */

@media only screen and (max-width: 767px) {
    .hero__categories {
        margin-bottom: 30px;
    }

    .hero__search {
        margin-bottom: 30px;
    }

    .hero_search_form {
        width: 100%;
    }

    .hero_search_form form input {
        width: 100%;
    }

    .hero_searchform form .herosearch_categories {
        display: none;
    }

    .hero_search_phone {
        float: left;
        margin-top: 30px;
    }

    .categories__slider.owl-carousel .owl-nav {
        text-align: center;
        margin-top: 40px;
    }

    .categories__slider.owl-carousel .owl-nav button {
        position: relative;
        left: 0;
        top: 0;
        -webkit-transform: translateY(0);
    }

    .categories__slider.owl-carousel .owl-nav button.owl-next {
        right: -10px;
    }

    .footer__copyright {
        text-align: center;
    }

    .footer_copyright_text {
        float: none;
        margin-bottom: 25px;
    }

    .footer_copyright_payment {
        float: none;
    }

    .filter__item {
        text-align: center;
    }

    .filter__option {
        text-align: center;
    }

    .product_details_pic {
        margin-bottom: 40px;
    }

    .product_details_tab .nav-tabs:before {
        display: none;
    }

    .product_details_tab .nav-tabs:after {
        display: none;
    }

    .shoping_cart_table {
        overflow-y: auto;
    }

    .shoping__discount form input {
        margin-bottom: 15px;
    }

    .blog_details_author {
        overflow: hidden;
        margin-bottom: 25px;
    }

    .humberger__open {
        display: block;
        font-size: 22px;
        color: #1c1c1c;
        height: 35px;
        width: 35px;
        line-height: 33px;
        text-align: center;
        border: 1px solid #1c1c1c;
        cursor: pointer;
        position: absolute;
        right: 15px;
        top: 22px;
    }

    .header .container {
        position: relative;
    }

    .humberger_menu_wrapper {
        width: 300px;
        background: #ffffff;
        position: fixed;
        left: -300px;
        top: 0;
        height: 100%;
        overflow-y: auto;
        z-index: 99;
        padding: 30px;
        padding-top: 50px;
        opacity: 0;
        display: block;
        -webkit-transition: all, 0.6s;
        -moz-transition: all, 0.6s;
        -ms-transition: all, 0.6s;
        -o-transition: all, 0.6s;
        transition: all, 0.6s;
    }

    .humberger_menuwrapper.showhumbergermenu_wrapper {
        opacity: 1;
        left: 0;
    }

    .humberger_menu_logo {
        margin-bottom: 30px;
    }

    .humberger_menu_logo a {
        display: inline-block;
    }

    .humberger_menu_contact {
        padding: 10px 0 13px;
    }

    .humberger_menu_contact ul li {
        font-size: 14px;
        color: #1c1c1c;
        position: relative;
        line-height: 30px;
        list-style: none;
    }

    .humberger_menu_contact ul li i {
        color: #252525;
        margin-right: 5px;
    }

    .humberger_menu_cart ul {
        display: inline-block;
        margin-right: 25px;
    }

    .humberger_menu_cart ul li {
        list-style: none;
        display: inline-block;
        margin-right: 15px;
    }

    .humberger_menu_cart ul li:last-child {
        margin-right: 0;
    }

    .humberger_menu_cart ul li a {
        position: relative;
    }

    .humberger_menu_cart ul li a i {
        font-size: 18px;
        color: #1c1c1c;
    }

    .humberger_menu_cart ul li a span {
        height: 13px;
        width: 13px;
        background: #7fad39;
        font-size: 10px;
        color: #ffffff;
        line-height: 13px;
        text-align: center;
        font-weight: 700;
        display: inline-block;
        border-radius: 50%;
        position: absolute;
        top: 0;
        right: -12px;
    }

    .humberger_menucart .headercart_price {
        font-size: 14px;
        color: #6f6f6f;
        display: inline-block;
    }

    .humberger_menucart .headercart_price span {
        color: #252525;
        font-weight: 700;
    }

    .humberger_menu_cart {
        margin-bottom: 25px;
    }

    .humberger_menu_widget {
        margin-bottom: 20px;
    }

    .humberger_menuwidget .headertopright_language {
        margin-right: 20px;
    }

    .humberger_menu_nav {
        display: none;
    }

    .humberger_menuwrapper .headertopright_social {
        display: block;
        margin-right: 0;
        margin-bottom: 20px;
    }

    .humberger_menu_wrapper .slicknav_btn {
        display: none;
    }

    .humberger_menu_wrapper .slicknav_nav .slicknav_item a {
        border-bottom: none !important;
    }

    .humberger_menu_wrapper .slicknav_nav {
        display: block !important;
    }

    .humberger_menu_wrapper .slicknav_menu {
        background: transparent;
        padding: 0;
        margin-bottom: 30px;
    }

    .humberger_menu_wrapper .slicknav_nav ul {
        margin: 0;
    }

    .humberger_menu_wrapper .slicknav_nav a {
        color: #1c1c1c;
        font-size: 16px;
        font-weight: 600;
        margin: 0;
        border-bottom: 1px solid #e1e1e1;
    }

    .humberger_menu_wrapper .slicknav_nav a:hover {
        -webkit-border-radius: 0;
        border-radius: 0;
        background: transparent;
        color: #7fad39;
    }

    .humberger_menu_wrapper .slicknav_nav .slicknav_row,
    .humberger_menu_wrapper .slicknav_nav a {
        padding: 8px 0;
    }

    .humberger_menu_overlay {
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        content: "";
        z-index: 98;
        visibility: hidden;
        -webkit-transition: all, 0.6s;
        -moz-transition: all, 0.6s;
        -ms-transition: all, 0.6s;
        -o-transition: all, 0.6s;
        transition: all, 0.6s;
    }

    .humberger_menu_overlay.active {
        visibility: visible;
    }

    .header__top {
        display: none;
    }

    .header__menu {
        display: none;
    }

    .header__cart {
        text-align: center;
        padding: 10px 0 24px;
    }

    .over_hid {
        overflow: hidden;
    }
}

/* Small Device = 320px */

@media only screen and (max-width: 479px) {
    .hero_searchform form .herosearch_categories {
        display: none;
    }

    .featured__controls ul li {
        margin-bottom: 10px;
    }

    .product_details_text ul li b {
        width: 100px;
    }

    .product_details_tab .nav-tabs li {
        margin-right: 20px;
    }

    .shoping_cart_btns {
        text-align: center;
    }

    .primary-btn.cart-btn.cart-btn-right {
        float: none;
        margin-top: 10px;
    }

    .shoping__checkout .primary-btn {
        display: block;
        text-align: center;
        padding: 10px 15px 10px;
    }

    .map .map-inside {
        -webkit-transform: translateX(-125px);
        -ms-transform: translateX(-125px);
        transform: translateX(-125px);
    }

    .map .map-inside .inside-widget {
        width: 250px;
    }

    .product_details_tab .nav-tabs li {
        margin-right: 15px;
    }

    .shoping__discount form input {
        width: 100%;
    }

    .checkout__order {
        padding: 20px;
    }

    .blog_detailshero_text h2 {
        font-size: 24px;
    }
}</style>