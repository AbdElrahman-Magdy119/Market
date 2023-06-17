<template>
    <div class="chatbot" style="margin-top: 30rem;">
        <div v-if="messages.length > 0" class="chat-container">
            <div v-for="message in messages" :key="message.id" class="message">
                <div v-if="message.isBot" class="bot-message">{{ message.content }}</div>
                <div v-else class="user-message">{{ message.content }}</div>
            </div>
        </div>
        <div class="input-container">
            <input v-model="userMessage" @keyup.enter="sendMessage" type="text" placeholder="Type a message...">
            <button @click="sendMessage">Send</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            messages: [],
            userMessage: '',
        };
    },
    methods: {
        async sendMessage() {
            if (this.userMessage.trim() !== '') {
                this.messages.push({
                    id: this.messages.length,
                    content: this.userMessage,
                    isBot: false,
                });

                try {
                    const response = await axios.post('http://localhost:8000/api/chatbot', {
                        message: this.userMessage,
                    });
                    console.log(response);
                    this.messages.push({
                        id: this.messages.length,
                        content: response.data.message,
                        isBot: true,
                    });

                    this.userMessage = '';
                } catch (error) {
                    console.error(error);
                }
            }
        },
    },
};
</script>

<style scoped>
.chatbot {
    max-width: 400px;
    margin: 0 auto;
}

.chat-container {
    height: 200px;
    overflow-y: scroll;
    border: 1px solid #ccc;
    padding: 10px;
}

.message {
    margin-bottom: 10px;
}

.bot-message {
    background-color: #f2f2f2;
    padding: 10px;
}

.user-message {
    background-color: #d0edff;
    padding: 10px;
}

.input-container {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}

.input-container input {
    flex-grow: 1;
    padding: 5px;
}

.input-container button {
    padding: 5px 10px;
}
</style>
