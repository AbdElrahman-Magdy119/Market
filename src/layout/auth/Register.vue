<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register" class="p-fluid">
      <div class="p-field">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model.trim="email" :class="{'p-invalid': !isValidEmail}" class="p-input" />
        <small v-if="!isValidEmail" class="p-error">Please enter a valid email address.</small>
      </div>
      <div class="p-field">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model.trim="name" :class="{'p-invalid': !isValidName}" class="p-input" />
        <small v-if="!isValidName" class="p-error">Name is required.</small>
      </div>
      <div class="p-field">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model.trim="lastName" :class="{'p-invalid': !isValidLastName}" class="p-input" />
        <small v-if="!isValidLastName" class="p-error">Last Name is required.</small>
      </div>
      <div class="p-field">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model.trim="password" :class="{'p-invalid': !isValidPassword}" class="p-input" />
        <small v-if="!isValidPassword" class="p-error">Password must be at least 8 characters long.</small>
      </div>
      <div class="p-field">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model.trim="confirmPassword" :class="{'p-invalid': !isValidConfirmPassword}" class="p-input" />
        <small v-if="!isValidConfirmPassword" class="p-error">Passwords do not match.</small>
      </div>
      <button type="submit" class="p-button p-button-primary">Register</button>
    </form>
    <Message v-if="registrationSuccess" severity="success" text="Registration successful!" />
  </div>
</template>

<script>
import Message from 'primevue/message'; // Import the Message component correctly
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import apiService from '@/services/apiService';

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
      if (!this.isValidEmail || !this.isValidName || !this.isValidLastName || !this.isValidPassword || !this.isValidConfirmPassword) {
        return;
      }
      const userData = {
        email: this.email,
        name: this.name,
        lastName: this.lastName,
        password: this.password,
      };
      apiService.register(userData)
          .then(response => {
            // Handle successful registration
            this.registrationSuccess = true;
            const token = response.data.token;
            localStorage.setItem('token', token);
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

