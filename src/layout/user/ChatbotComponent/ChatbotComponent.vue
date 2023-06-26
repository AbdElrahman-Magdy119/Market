<template>
    <div class="chatbot" style="margin-top: 30rem;">
        <div v-if="messages.length > 0" class="chat-container" >

            <div v-for="message in messages" :key="message.id" class=" message d-flex " >
                <div v-if="message.id==2 && message.isBot==true" class=" d-flex" > 
                     <img src="../../../assets/logo.png"  >
                     <p class=" bot-message ">{{  message.content }}</p> 
                       
                </div>

                
                <div v-else-if="message.id==3" class="d-fle" > 
                     
                     <div v-for="content in message.content" :key="content.id" > 
                        <div v-if="message.isBot==true && this.language.language == 'Arabic'"  class=" my-2" >
                             <div v-if="content.id == 1" class="d-flex"> 
                                <img  src="../../../assets/logo.png"  >
                                <button :disabled="clickOnceAnswer==true"  @click.once="getAnswer(content.id,$event)"  class=" bot-message " >{{ content.ar_question }}</button>
                             </div>
                             <div v-else class=" bot-message "> 
                              <button :disabled="clickOnceAnswer==true"  @click.once="getAnswer(content.id,$event)">  {{ content.ar_question }}  </button>
                             </div>
                            
                        </div>
                        <div v-if="message.isBot==true && this.language.language == 'English'"  class=" my-2" >
                            <div v-if="content.id == 1" class="d-flex"> 
                                <img  src="../../../assets/logo.png"  >
                                <button class=" bot-message " :disabled="clickOnceAnswer==true"  @click.once="getAnswer(content.id,$event)" >{{ content.en_question }}</button>
                             </div>
                             <div v-else > 
                              <button class=" bot-message " :disabled="clickOnceAnswer==true"  @click.once="getAnswer(content.id,$event)">  {{ content.en_question }} </button>
                             </div>
                        </div>
                     </div>
                </div>
          
                 <div v-else-if="message.id==1" class="d-flex"> 
                    <img src="../../../assets/logo.png"  >
                    <div  v-for="content in message.content" :key="content.id"  > 
                        <div v-if="message.isBot==true"  class="  my-2 mx-2" >
                          <button :disabled="clickOncelanguage==true" class=" bot-message"  @click.once="getlanguage($event)" >  {{ content}} </button>
                            
                        </div>
                    
                    </div>
                </div>
                
                <div v-if="message.id==4 && message.isBot==true" class=" d-flex" > 
                     <img src="../../../assets/logo.png"  >
                     <p  v-if="this.language.language == 'Arabic'" class=" bot-message ">{{  message.content.ar_answer }}</p> 
                     <p  v-else class=" bot-message ">{{  message.content.en_answer }}</p> 
  
                </div>
                
                <div  v-if="(message.id==5 || message.id==6 || message.id==7 ) && message.isBot==true" class="d-flex"> 
                    <img v-if=" message.id==7 " src="../../../assets/logo.png"  >
                    <p   class=" bot-message " @click.once="getUserAnswer($event)"  >{{  message.content }}</p>
                </div>
                
                <div v-if="message.isBot==false" class="user-message">{{ message.content }}</div>

            </div>

        </div>
    </div>
</template>

<script>
import ChatbotService  from '@/services/ChatbotService';

export default {
    data() {
        return {
            messages: [],
            userMessage: '',
            language:'',
            clickOncelanguage:false,
            clickOnceAnswer:false
        };
    },
    mounted() {
        ChatbotService.getLanguage().then((data) => {
        this.messages.push({
            isBot: true,
            content: data.data.languages,
            id:1
        })
		});
    },
    methods: {
        async getAnswer(questionId,event)
         {
            this.clickOnceAnswer = true;
            this.messages.push({
                    content:event.target.innerText,
                    isBot: false,
                    id:4
            })
            const data={
                "questionId":questionId,
                "language":this.language.language
            }
            await ChatbotService.getAnswerOfQuestion(data).then((data) => {
              this.messages.push({
                     isBot: true,
                     content: data.data.answer,
                     id:4
              })
	    	});
            if(this.language.language == "English")
              {
                this.messages.push({
                    content:"Return to the previous list",
                    isBot: true,
                    id:5
                })
                this.messages.push({
                    content:"End Chat",
                    isBot: true,
                    id:6
                })
              }
            else
            {
                this.messages.push({
                    content:"الرجوع الي القائمه السابقه",
                    isBot: true,
                    id:5
                })
                this.messages.push({
                    content:"إنهاء الشات",
                    isBot: true,
                    id:6
                })
            }
            
            
         },
         getlanguage(event)
         {
             this.clickOncelanguage = true;
             this.language = {
               "language":event.target.innerText
            }
            if(this.language.language == "English")
              {
                this.messages.push({
                    content:"English",
                    isBot: false,
                    id:2
                })
                this.messages.push({
                    content:"Hello! How can I assist you today?",
                    isBot: true,
                    id:2
                })
              }
            else
            {
                this.messages.push({
                    content:"Arabic",
                    isBot: false,
                    id:2
                })
                this.messages.push({
                    content:"مرحبًا! كيف يمكنني مساعدتك اليوم؟",
                    isBot: true,
                    id:2
                })
            }
            ChatbotService.getQuestionAfterSendLanguage(this.language).then((data) => {
              this.messages.push({
                     isBot: true,
                     content: data.data.questions,
                     id:3
              })
	    	});
	    	
         },
         getUserAnswer(event)
         {
            const data = {
               "language":this.language.language
             }
             if(event.target.innerText == "End Chat" || event.target.innerText == "إنهاء الشات")
             {   
               ChatbotService.getCloseChat(data).then((data) => {
                    this.messages.push({
                        isBot: true,
                        content: data.data.message,
                        id:7
                    })
	    	   })  
             }
             else
             {
                this.clickOnceAnswer = false
                ChatbotService.getQuestionAfterSendLanguage(this.language).then((data) => {
                this.messages.push({
                     isBot: true,
                     content: data.data.questions,
                       id:3
                  })
	          	});
             }
         }
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

img{
    width: 30px;
    height:30px;
    border-radius: 50%;
    margin-top: 8px;
}


.message {
    margin-bottom: 10px;
}

.bot-message {

    background-color: #f2f2f2;
    padding: 10px;
    width: fit-content;
}

.user-message {
    background-color:#d0edff;
    padding: 10px;
    width: fit-content;
    
    /* #d0edff */
}


</style>
