<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div v-if="message.length !== 0" class="alert alert-danger text-center">
          {{ message }}
        </div>
      </div>
    </div>
  </div>

  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register" class="p-fluid">
      <div class="p-field">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model.trim="email" :class="{'p-invalid': !isValidEmail}" class="p-input" />
        <small v-if="formSubmitted && !isValidEmail" class="p-error">Please enter a valid email address.</small>
      </div>
      <div class="p-field">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model.trim="name" :class="{'p-invalid': !isValidName}" class="p-input" />
        <small v-if="formSubmitted && !isValidName" class="p-error">Name is required.</small>
      </div>
      <div class="p-field">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model.trim="lastName" :class="{'p-invalid': !isValidLastName}" class="p-input" />
        <small v-if="formSubmitted && !isValidLastName" class="p-error">Last Name is required.</small>
      </div>
      <div class="p-field">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model.trim="password" :class="{'p-invalid': !isValidPassword}" class="p-input" />
        <small v-if="formSubmitted && !isValidPassword" class="p-error">Password must be at least 8 characters long.</small>
      </div>
      <div class="p-field">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model.trim="confirmPassword" :class="{'p-invalid': !isValidConfirmPassword}" class="p-input" />
        <small v-if="formSubmitted && !isValidConfirmPassword" class="p-error">Passwords do not match.</small>
      </div>
      <button type="submit" class="p-button p-button-primary">Register</button>
    </form>
    <Message v-if="registrationSuccess" severity="success" text="Registration successful!" />
  </div>
</template>

<script>
import Message from 'primevue/message';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import authService from '@/services/AuthService';
import * as router from 'vue-router';

export default {
  components: {
    Message,
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
  computed: {
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
            const address1 = response.data.address;
            localStorage.setItem('token', token);
            localStorage.setItem('name', name);
            localStorage.setItem('role', role);
            localStorage.setItem('id', id);
            localStorage.setItem('lastName',lastName);
            localStorage.setItem('phone',phone);
            localStorage.setItem('email',email);
            localStorage.setItem('address1',address1);
            this.email = '';
            this.name = '';
            this.lastName = '';
            this.password = '';
            this.confirmPassword = '';
          })
          .catch(error => {
            // Handle error
          });
    },
  },
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
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
</style>
