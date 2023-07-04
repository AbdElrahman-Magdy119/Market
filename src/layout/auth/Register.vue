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

    <div class="container" style="margin:10rem 3rem">
        <div class="row justify-content-center align-items-center">
            <div class="col-12 col-md-6 text-center">
                <div class="w-100">
                    <img src="../../../public/images/register.svg" class="w-75" alt="Welome Picture">
                </div>
            </div>

            <div class="col-12 col-md-6 ">
                <div class="card">
                    <div class="card-header">
                        <h2>Register Form</h2>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="register">
                            <div class="mb-3">
                                <label for="name" class="form-label">First Name</label>
                                <input type="text" id="name" class="form-control" placeholder="First Name" v-model.trim="name" />
                                <small v-if="formSubmitted && !isValidName" class="error-message">Name is required.</small>
                            </div>
                            <div class="mb-3">
                                <label for="lastName" class="form-label">Last Name</label>
                                <input type="text" id="lastName" class="form-control" placeholder="Last Name" v-model.trim="lastName" />
                                <small v-if="formSubmitted && !isValidLastName" class="error-message">Last Name is required.</small>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">E-mail</label>
                                <input type="email" id="email" class="form-control" placeholder="Email" v-model.trim="email"  />
                                <small v-if="formSubmitted && !isValidEmail" class="error-message">Please enter a valid email address.</small>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" id="password" class="form-control" placeholder="Password" v-model.trim="password"  />
                                <small v-if="formSubmitted && !isValidPassword" class="error-message">Password must be at least 8 characters long.</small>
                            </div>
                            <div class="mb-3">
                                <label for="confirmPassword" class="form-label">Password</label>
                                <input type="password" id="confirmPassword" class="form-control" placeholder="Confirm Password" v-model.trim="confirmPassword" />
                                <small v-if="formSubmitted && !isValidConfirmPassword" class="error-message">Passwords do not match.</small>
                            </div>

                            <div class="row login-link-container">
                                <span class="">Already have Account? <router-link to="login">LogIn</router-link></span>
                            </div>

                            <div class="p-field row gy-2 register-buttons-container">
                                <div class="col-12 col-md-4 ">
                                    <button type="submit" class="btn btn-primary">Register</button>
                                </div>
<!--                                <div class="col-12 col-md-8">-->
<!--                                    <GoogleLogin></GoogleLogin>-->
<!--                                </div>-->
                            </div>
                            <Message v-if="registrationSuccess" severity="success" text="Registration successful!" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <FooterComponent/>
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
import FooterComponent from '@/layout/user/Footer/Footer.vue'

export default {
  components: {
      FooterComponent,
    GoogleLogin,
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

.error-message {
    color: red;
    font-size: 12px;
    margin-top: 5px;
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
}
</style>
