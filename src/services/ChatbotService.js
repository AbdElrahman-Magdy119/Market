import axios from 'axios';
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        // Add any common headers if needed
        'Content-Type': 'application/json',
        'Accept':'application/json',
        // 'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
});

const ChatbotService = {
    getLanguage() {
        return apiClient.get('/chatbot/language-options');
    },
    getQuestionAfterSendLanguage(language) {
        return apiClient.post('/chatbot/language-selection', language)
    },
    getAnswerOfQuestion(question){
        return apiClient.post('/chatbot/answer', question)
    },
    getCloseChat(language){
        return apiClient.post('/chatbot/closechat', language)
    }

    
 
};


export default ChatbotService;