<template>
    <div>
        <div id="g_id_onload"
             :data-client_id="clientId"
             data-callback="handleCredentialResponse">
        </div>
        <div class="g_id_signin" data-type="standard"></div>
    </div>
</template>

<script>
import authService from "@/services/AuthService";
// import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';


export default {
    name:"GoogleLogin",
    data() {
        return {
            clientId: null,
        };
    },
    mounted() {
        // Define the callback function to handle the credential response
        window.handleCredentialResponse = this.handleCredentialResponse;
        this.clientId = "380461466531-kks7596sd3o6kufbm8iiem2clbdrb2b2.apps.googleusercontent.com";
    },
    methods: {
        handleCredentialResponse(response) {
            console.log(response);

            // Example of decoding a JWT token
            const decodedToken = jwtDecode(response.credential, 'my-google');
            console.log(decodedToken);

            authService.googleRegister()
                .then((res)=>{
                    console.log("Logged");
                    console.log(res);
                    window.location.href = 'http://localhost:8000/auth/google'
                    // window.location.href = res.data;
                })
                .catch((err)=>{
                    console.log("Error");
                    console.log(err);
                })
            // You can perform further actions with the response, such as sending it to your backend for authentication or storing user information
        },
    },
};
</script>

<style scoped>

</style>