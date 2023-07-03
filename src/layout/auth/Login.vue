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

  <div class="container mt-5 d-flex justify-content-center align-items-center w-100" style="margin-bottom:12rem;">

  <form @submit.prevent="login">
    <!-- Email input -->
    <div class="form-outline mb-4">
      <input type="email" id="loginEmail" v-model="email" class="form-control "  />
      <label class="form-label" for="loginEmail">Email address</label>
    </div>

    <!-- Password input -->
    <div class="form-outline mb-4">
      <input type="password" class="form-control " id="loginPassword" v-model="password" />
      <label class="form-label" for="loginPassword">Password</label>
    </div>

    <!-- 2 column grid layout for inline styling -->
    <div class="row mb-4">
      <div class="col d-flex justify-content-center">
        <!-- Checkbox -->
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
          <label class="form-check-label" for="form2Example31"> Remember me </label>
        </div>
      </div>

<!--      <div class="col">-->
<!--        &lt;!&ndash; Simple link &ndash;&gt;-->
<!--        <a href="#">Forgot password?</a>-->
<!--      </div>-->
    </div>

    <!-- Submit button -->
    <div class="text-center">
      <button type="submit" class="btn mb-4">Sign in</button>
    </div>

    <!-- Register buttons -->
    <div class="text-center">
      <p>Not a member? <router-link to="register">Register</router-link></p>
      <p>or sign up with:</p>
      <div class="text-center ms-5">
        <GoogleLogin></GoogleLogin>
      </div>
<!--      <button type="button" class="btn btn-link btn-floating mx-1">-->
<!--        <i class="fab fa-facebook-f"></i>-->
<!--      </button>-->

<!--      <button type="button" class="btn btn-link btn-floating mx-1" @click="googleLogin">-->
<!--        <i class="fab fa-google"></i>-->
<!--      </button>-->

<!--      <button type="button" class="btn btn-link btn-floating mx-1">-->
<!--        <i class="fab fa-twitter"></i>-->
<!--      </button>-->

<!--      <button type="button" class="btn btn-link btn-floating mx-1">-->
<!--        <i class="fab fa-github"></i>-->
<!--      </button>-->
    </div>
  </form>


  </div>
    <div>
        <FooterComponent/>
    </div>

</template>

<style scoped>

</style>
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
*{
    font-size:20px;
}
</style>