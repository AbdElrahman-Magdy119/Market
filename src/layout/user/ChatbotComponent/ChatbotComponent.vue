<template>
    <div style="margin-top: 10rem;">
        <div v-for="message in chatMessages" :key="message.id">
            {{ message }}
        </div>
        <input v-model="userInput" @keydown.enter="sendMessage" />
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            chatMessages: [],
            userInput: '',
            languageOptions: [],
            selectedLanguage: '',
            questions: [],
            currentQuestionId: 0,
        };
    },
    mounted() {
        this.fetchLanguageOptions();
    },
    methods: {
        fetchLanguageOptions() {
            axios.get('http://localhost:8000/api/chatbot/language-options')
                .then(response => {
                    this.languageOptions = response.data.languages;
                    this.chatMessages.push('Welcome! Please select your preferred language:');
                    this.chatMessages.push(this.languageOptions.join(', '));
                })
                .catch(error => {
                    console.error(error);
                });
        },
        sendMessage() {
            const message = this.userInput;
            this.chatMessages.push(message);
            this.userInput = '';

            if (!this.selectedLanguage) {
                // Language selection
                this.selectedLanguage = message;
                this.chatMessages.push(`Language selected: ${this.selectedLanguage}`);

                axios.post('http://localhost:8000/api/chatbot/language-selection', { language: this.selectedLanguage })
                    .then(response => {
                        this.questions = response.data.questions;
                        this.chatMessages.push(this.questions[0]);
                        this.currentQuestionId = 0;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                // Answer submission
                const answer = message;

                axios.post('http://localhost:8000/api/chatbot/answer', {
                    language: this.selectedLanguage,
                    questionId: this.currentQuestionId,
                    answer: answer
                })
                    .then(response => {
                        const botResponse = response.data.response;
                        this.chatMessages.push(botResponse);

                        if (this.currentQuestionId < this.questions.length - 1) {
                            this.currentQuestionId++;
                            this.chatMessages.push(this.questions[this.currentQuestionId]);
                        } else {
                            this.selectedLanguage = '';
                            this.questions = [];
                            this.chatMessages.push('Do you want to start over or close the chat?');
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        },
    },
};
</script>
