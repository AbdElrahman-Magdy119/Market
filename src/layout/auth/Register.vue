<template>
<HeaderComponent/>
  <div class="container">
    <div class="row gy-2">
      <div class="col-12">
        <div v-if="message.length !== 0" class="alert alert-danger text-center">
          {{ message }}
        </div>
      </div>
    </div>
  </div>

  <div class="register">
    <h2 class="form-header">Account Detiles</h2>
    <form @submit.prevent="register" class="p-fluid">
      <div class="p-field row gy-2">
        <div class="col-6">
          <input type="text" id="name" class="form-control" placeholder="First Name" v-model.trim="name" :class="{'p-invalid': !isValidName}" />
          <small v-if="formSubmitted && !isValidName" class="p-error">Name is required.</small>
        </div>
        <div class="col-6">
          <input type="text" id="lastName" class="form-control" placeholder="Last Name" v-model.trim="lastName" :class="{'p-invalid': !isValidLastName}" />
          <small v-if="formSubmitted && !isValidLastName" class="p-error">Last Name is required.</small>          
        </div>
      </div>
      <div class="p-field">
        <input type="email" id="email" class="form-control" placeholder="Email" v-model.trim="email" :class="{'p-invalid': !isValidEmail}" />
        <small v-if="formSubmitted && !isValidEmail" class="p-error">Please enter a valid email address.</small>
      </div>      
      <div class="p-field row gy-2">
        <div class="col-6">
          <input type="password" id="password" class="form-control" placeholder="Password" v-model.trim="password" :class="{'p-invalid': !isValidPassword}" />
          <small v-if="formSubmitted && !isValidPassword" class="p-error">Password must be at least 8 characters long.</small>
        </div>
        <div class="col-6">
          <input type="password" id="confirmPassword" class="form-control" placeholder="Confirm Password" v-model.trim="confirmPassword" :class="{'p-invalid': !isValidConfirmPassword}" />
          <small v-if="formSubmitted && !isValidConfirmPassword" class="p-error">Passwords do not match.</small>
        </div>
      </div>
      <div class="p-field row gy-2 register-buttons-container">
        <div class="col- col-md-4 ">
          <button type="submit" class="btn btn-primary">Register</button>
        </div>
        <div class="col- col-md-8">
          <GoogleLogin></GoogleLogin>          
        </div>
      </div>
      <div class="row login-link-container">
        <span class="">Already have Account? <router-link to="login">LogIn</router-link></span>
      </div>      
      <div class="text-center row justify-content-center mt-2">
<!--          <button @click="google" class="btn btn-outline-success my-5">Sign-up With Google</button>-->
         
<!--        <h1>Is Initialized: {{ Vue3GoogleOauth2.isInit }}</h1>-->
<!--          <h1>Is Authorized: {{ Vue3GoogleOauth2.isAuthorized }}</h1>-->
<!--      <button :disabled='!Vue3GoogleOauth2.isInit || Vue3GoogleOauth2.isAuthorized'>Sign in</button>-->
<!--          <button :disabled='!Vue3GoogleOauth2.isAuthorized'>Sign up</button>-->
      </div>
    <Message v-if="registrationSuccess" severity="success" text="Registration successful!" />
    </form>
  </div>
</div>

</template>

<script>
import Message from 'primevue/message';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import authService from '@/services/AuthService';
import HeaderComponent from '@/layout/user/Header/Header.vue'
import * as router from 'vue-router';
import GoogleLogin from "@/layout/auth/GoogleLogin.vue";
import Vue3GoogleOauth2 from "vue3-google-oauth2";
import {inject} from "vue";
import HeaderComponent from "@/layout/user/Header/Header.vue";

export default {
  components: {
<<<<<<< HEAD
    GoogleLogin,
=======
    HeaderComponent,
      GoogleLogin,
>>>>>>> 185880b7ccb9f2431e04c260020bfe9f20ab3a11
    Message,
    HeaderComponent
  },
  data() {
    return {
      email: '',
      name: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      registrationSuccess: false,
      message: '',
      formSubmitted: false,
    };
  },
    mounted() {
      const Vue3GoogleAuth = inject('Vue3GoogleOauth');
    },
    computed: {
      Vue3GoogleOauth2() {
          return Vue3GoogleOauth2
      },
    isValidEmail() {
      const emailRegex = /^\S+@\S+\.\S+$/;
      return emailRegex.test(this.email);
    },
    isValidName() {
      return this.name.trim() !== '';
    },
    isValidLastName() {
      return this.lastName.trim() !== '';
    },
    isValidPassword() {
      return this.password.length >= 8;
    },
    isValidConfirmPassword() {
      return this.password === this.confirmPassword;
    },
  },
  methods: {
      register() {
      this.formSubmitted = true;

      if (!this.isValidEmail || !this.isValidName || !this.isValidLastName || !this.isValidPassword || !this.isValidConfirmPassword) {
        return;
      }

      const userData = {
        email: this.email,
        name: this.name,
        lastName: this.lastName,
        password: this.password,
      };

      authService
          .register(userData)
          .then(response => {
            this.registrationSuccess = true;
            const token = response.data.token;
            const name = response.data.name;
            const role = response.data.role.name;
            const id = response.data.id;
            const lastName = response.data.lastName;
            const email = response.data.email;
            const phone = response.data.phone;
            const address = response.data.address;
            localStorage.setItem('token', token);
            localStorage.setItem('name', name);
            localStorage.setItem('role', role);
            localStorage.setItem('id', id);
            localStorage.setItem('lastName',lastName);
            localStorage.setItem('phone',phone);
            localStorage.setItem('email',email);
            localStorage.setItem('address',address);
            this.$router.push('/');
          })
          .catch(error => {
            // Handle error
          });
    },
      google(){
          authService.googleRegister()
              .then((res)=>{
                  console.log(res);
              })
              .catch((err)=>{
                  console.log("ERROR");
                  console.log(err);
              })
      }
  },
};
</script>

<style scoped>
*{
  font-size:20px;
}
.register {
  max-width: 400px;
  margin: 12rem auto;
  padding: 2rem;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
}

.p-field {
  margin-bottom: 1rem;
}

.p-input {
  width: 100%;
}

.p-invalid {
  border-color: red;
}

.p-error {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
<<<<<<< HEAD

.login-link-container
{
  padding: 7px;
  text-align: center;
}

.form-header
{
  margin-bottom: 20px;
}

.register-buttons-container
{
  padding-left: 30px;
  margin-top: 20px;
=======
input{
  border: 1px solid gray !important;
>>>>>>> 185880b7ccb9f2431e04c260020bfe9f20ab3a11
}
</style>
