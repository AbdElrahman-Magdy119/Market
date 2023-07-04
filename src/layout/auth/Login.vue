<template>
    <div>
        <HeaderComponent/>
    </div>

    <div class="container" style="margin-top:12rem;">
        <div class="row">
            <div class="col-12">
                <div v-if="message.length !== 0" class="alert alert-danger text-center">
                    {{message}}
                </div>
            </div>
        </div>
    </div>



  <!--LOGIN FORM-->
    <div class="container mb-4">
        <div class="row align-items-center justify-content-center">
            <div class="col-6">
                <div>
                    <img src="../../../public/images/login.svg" alt="login" class="w-75">
                </div>
            </div>
            <div class="col-6">
                <div class="card">
                    <div class="card-header">
                        <h4>Login</h4>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="login" class="login-form">
                            <p id="notfound"></p>
                            <div class="mb-3">
                                <label for="loginEmail" class="form-label">Email</label>
                                <input type="email" id="loginEmail" v-model="email" class="form-control " placeholder="Email" />
                            </div>
                            <div class="mb-3">
                                <label for="loginPassword" class="form-label">Password</label>
                                <input type="password" class="form-control " id="loginPassword" v-model="password" placeholder="Password" />
                            </div>

                            <div class="my-3">
                                <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                                <label class="form-check-label" for="form2Example31"> Remember me </label>
                            </div>

                            <div class="text-center">
                                <button type="submit" class="paypal-button w-50 text-center my-3" >Sign in</button>
                                <p class="">Not a member? <router-link to="register">Register</router-link></p>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <!--LOGIN FORM-->

    <div>
        <FooterComponent/>
    </div>

</template>



<script>
import Toast from 'primevue/toast';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import authService from '@/services/AuthService';
import GoogleSignInButton from 'vue-google-signin-button';
import GoogleLogin from "@/layout/auth/GoogleLogin.vue";
import HeaderComponent from "@/layout/user/Header/Header.vue";
import FooterComponent from "@/layout/user/Footer/Footer.vue";

export default {
  components: {
      FooterComponent,
      HeaderComponent,
      GoogleLogin,
    Toast,
    GoogleSignInButton
  },
  data() {
    return {
        email: '',
        password: '',
        loginSuccess: false,
        message:'',
    };
  },
  methods: {
    login() {
      const credentials = {
        email: this.email,
        password: this.password,
      };
      authService
          .login(credentials)
          .then(response => {
            // console.log(response.data);
            // Handle successful login
              console.log(response.data);
            this.loginSuccess = true;
            this.message = '';
            const token = response.data.token;
            const name = response.data.name;
            const lastName = response.data.lastName;
            const address = response.data.address;
            const phone = response.data.phone;
            const role = response.data.role.name;
            const email=response.data.email;
            const id = response.data.id;

            localStorage.setItem('token', token);
            localStorage.setItem('name', name);
            localStorage.setItem('role', role);
            localStorage.setItem('id', id);
            localStorage.setItem('lastName',lastName);
            localStorage.setItem('phone',phone);
            localStorage.setItem('email',email);
            localStorage.setItem('address',address);
              // Navigate to admin component
              this.$router.push('/');
          })
          .catch(error => {
              console.log(error);
            this.message = "Wrong E-mail or Password"
          });
    },
    googleLogin() {
      // Call the Google Sign-In API or navigate to the Google Sign-In page
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: '380461466531-kks7596sd3o6kufbm8iiem2clbdrb2b2.apps.googleusercontent.com',
        }).then(() => {
          const auth2 = gapi.auth2.getAuthInstance();
          auth2.signIn().then((googleUser) => {
            const id_token = googleUser.getAuthResponse().id_token;

            // Call your backend API to authenticate the user with the Google ID token
            authService.googleLogin({ id_token })
                .then((response) => {
                  // Handle successful login
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
                  // Navigate to the desired route or perform any other action
                })
                .catch((error) => {
                  // Handle login error
                  console.log(error);
                });
          }).catch((error) => {
            // Handle sign-in error
            console.log(error);
          });
        });
      });
    },
  },
};
</script>
<style scoped>
.paypal-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #004ee5;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.paypal-button i {
    margin-right: 5px;
}

.paypal-button:hover {
    background-color: #001e5a;
}
*{
  font-size:1.7rem;
}
.login-form
{
  padding: 2rem;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
}

.signup-link-container
{
  padding: 7px;
  text-align: center;
}

</style>