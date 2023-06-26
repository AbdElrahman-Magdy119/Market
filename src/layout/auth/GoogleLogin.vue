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
export default {
    name:"GoogleLogin",
    data() {
        return {
            clientId: '380461466531-96gor4tmukkkijan8kia9plir6c1g112.apps.googleusercontent.com',
        };
    },
    mounted() {
        // Define the callback function to handle the credential response
        window.handleCredentialResponse = this.handleCredentialResponse;
    },
    methods: {
        handleCredentialResponse(response) {
            // Handle the credential response here
            console.log(response);
            // You can perform further actions with the response, such as sending it to your backend for authentication or storing user information
        },
    },
};
</script>

<style scoped>

</style>