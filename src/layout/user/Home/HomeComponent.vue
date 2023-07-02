<template>
  <div>
    <Banner />
    <AllCategory />
    <TrendingProduct />
    <Packages />

    <a class="chat-button"
      ><img
        @click="toggleChatBot()"
        src="../../../../public/images/chatbot-svgrepo-com.svg"
        class="img"
    /></a>
    <div id="chatbot" class="chatbot">
      <div class="chat"><b>Chat</b></div>
      <div v-if="messages.length > 0" class="chat-container">
        <div
          v-for="message in messages"
          :key="message.id"
          class="message d-flex"
        >
          <div v-if="message.id == 2 && message.isBot == true" class="d-flex">
            <img src="../../../assets/logo.png" />
            <p class="bot-message">{{ message.content }}</p>
          </div>

          <div v-else-if="message.id == 3" class="d-fle">
            <div v-for="content in message.content" :key="content.id">
              <div
                v-if="
                  message.isBot == true && this.language.language == 'Arabic'
                "
                class="my-2"
              >
                <div v-if="content.id == 1" class="d-flex">
                  <img src="../../../assets/logo.png" />
                  <button
                    :disabled="clickOnceAnswer == true"
                    @click.once="getAnswer(content.id, $event)"
                    class="bot-message"
                  >
                    {{ content.ar_question }}
                  </button>
                </div>
                <div v-else class="bot-message" style="margin-left: 29px">
                  <button
                    :disabled="clickOnceAnswer == true"
                    @click.once="getAnswer(content.id, $event)"
                  >
                    {{ content.ar_question }}
                  </button>
                </div>
              </div>
              <div
                v-if="
                  message.isBot == true && this.language.language == 'English'
                "
                class="my-2"
              >
                <div v-if="content.id == 1" class="d-flex">
                  <img src="../../../assets/logo.png" />
                  <button
                    class="bot-message"
                    :disabled="clickOnceAnswer == true"
                    @click.once="getAnswer(content.id, $event)"
                  >
                    {{ content.en_question }}
                  </button>
                </div>
                <div v-else style="margin-left: 29px">
                  <button
                    class="bot-message"
                    :disabled="clickOnceAnswer == true"
                    @click.once="getAnswer(content.id, $event)"
                  >
                    {{ content.en_question }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="message.id == 1" class="d-flex">
            <img src="../../../assets/logo.png" />
            <div v-for="content in message.content" :key="content.id">
              <div v-if="message.isBot == true" class="my-2 mx-2">
                <button
                  :disabled="clickOncelanguage == true"
                  class="bot-message"
                  @click.once="getlanguage($event)"
                >
                  {{ content }}
                </button>
              </div>
            </div>
          </div>

          <div v-if="message.id == 4 && message.isBot == true" class="d-flex">
            <img src="../../../assets/logo.png" />
            <p v-if="this.language.language == 'Arabic'" class="bot-message">
              {{ message.content.ar_answer }}
            </p>
            <p v-else class="bot-message">{{ message.content.en_answer }}</p>
          </div>

          <div
            v-if="
              (message.id == 5 || message.id == 6 || message.id == 7) &&
              message.isBot == true
            "
            class="d-flex"
          >
            <img v-if="message.id == 7" src="../../../assets/logo.png" />
            <p
              v-if="message.id != 7"
              class="bot-message"
              @click.once="getUserAnswer($event)"
              style="margin-left: 29px"
            >
              {{ message.content }}
            </p>
            <p v-else class="bot-message" @click.once="getUserAnswer($event)">
              {{ message.content }}
            </p>
          </div>

          <div v-if="message.isBot == false" class="user-message">
            <div class="user-message-content">
              {{ message.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <video id="recive-video" src="../../../../public/Voice/recive.mp3"></video>
    <video id="send-video" src="../../../../public/Voice/send.mp3"></video>
  </div>
</template>

<script>
import ChatbotService from "@/services/ChatbotService";
import Banner from "../../../components/user/Home/Banner.vue";
import AllCategory from "../../../components/user/Home/AllCategory.vue";
import TrendingProduct from "../../../components/user/Home/TrendingProduct.vue";
import Packages from "../../../components/user/Home/Packages.vue";
export default {
  components: {
    Banner,
    AllCategory,
    TrendingProduct,
    Packages,
  },
  data() {
    return {
      messages: [],
      userMessage: "",
      language: "",
      clickOncelanguage: false,
      clickOnceAnswer: false,
    };
  },
  mounted() {
    ChatbotService.getLanguage().then((data) => {
      this.messages.push({
        isBot: true,
        content: data.data.languages,
        id: 1,
      });
    });
  },
  methods: {
    toggleChatBot() {
      var chatbotDiv = document.getElementById("chatbot");
      chatbotDiv.style.display =
        chatbotDiv.style.display === "none" ? "block" : "none";
      if (chatbotDiv.style.display == "block") {
        const video = document.getElementById("recive-video");

        this.messages = [];
        this.userMessage= ""
        this.language= ""
        this.clickOncelanguage= false
        this.clickOnceAnswer= false
        ChatbotService.getLanguage().then((data) => {
          this.messages.push({
            isBot: true,
            content: data.data.languages,
            id: 1,
          });
        });

        video.play();
      }
    },
    async getAnswer(questionId, event) {
      this.clickOnceAnswer = true;
      this.messages.push({
        content: event.target.innerText,
        isBot: false,
        id: 4,
      });
      const video = document.getElementById("send-video");
      video.play();
      const data = {
        questionId: questionId,
        language: this.language.language,
      };
      await ChatbotService.getAnswerOfQuestion(data).then((data) => {
        this.messages.push({
          isBot: true,
          content: data.data.answer,
          id: 4,
        });
        const video = document.getElementById("recive-video");
        video.play();
      });
      if (this.language.language == "English") {
        this.messages.push({
          content: "Return to the previous list",
          isBot: true,
          id: 5,
        });
        const video = document.getElementById("recive-video");
        video.play();
        this.messages.push({
          content: "End Chat",
          isBot: true,
          id: 6,
        });
        video.play();
      } else {
        this.messages.push({
          content: "الرجوع الي القائمه السابقه",
          isBot: true,
          id: 5,
        });
        const video = document.getElementById("recive-video");
        video.play();
        this.messages.push({
          content: "إنهاء الشات",
          isBot: true,
          id: 6,
        });
        video.play();
      }
    },
    getlanguage(event) {
      this.clickOncelanguage = true;
      this.language = {
        language: event.target.innerText,
      };
      if (this.language.language == "English") {
        this.messages.push({
          content: "English",
          isBot: false,
          id: 2,
        });
        const video = document.getElementById("send-video");
        video.play();
        this.messages.push({
          content: "Hello! How can I assist you today?",
          isBot: true,
          id: 2,
        });
        const videoRecive = document.getElementById("recive-video");
        videoRecive.play();
      } else {
        this.messages.push({
          content: "Arabic",
          isBot: false,
          id: 2,
        });
        const video = document.getElementById("send-video");
        video.play();
        this.messages.push({
          content: "مرحبًا! كيف يمكنني مساعدتك اليوم؟",
          isBot: true,
          id: 2,
        });
        const videoRecive = document.getElementById("recive-video");
        videoRecive.play();
      }
      ChatbotService.getQuestionAfterSendLanguage(this.language).then(
        (data) => {
          this.messages.push({
            isBot: true,
            content: data.data.questions,
            id: 3,
          });
          const videoRecive = document.getElementById("recive-video");
          videoRecive.play();
        }
      );
    },
    getUserAnswer(event) {
      const data = {
        language: this.language.language,
      };
      if (
        event.target.innerText == "End Chat" ||
        event.target.innerText == "إنهاء الشات"
      ) {
        if (this.language.language == "English") {
          this.messages.push({
            isBot: false,
            content: "End Chat",
            id: 7,
          });
          const video = document.getElementById("send-video");
          video.play();
        } else {
          this.messages.push({
            isBot: false,
            content: "إنهاء الشات",
            id: 7,
          });
          const video = document.getElementById("send-video");
          video.play();
        }

        ChatbotService.getCloseChat(data).then((data) => {
          this.messages.push({
            isBot: true,
            content: data.data.message,
            id: 7,
          });
          const video = document.getElementById("recive-video");
          video.play();
        });

        setTimeout(function () {
          var element = document.getElementById("chatbot");
          if (element) {
            element.style.display = "none";
          }
        }, 6000); // 1000 milliseconds = 1 second
      } else {
        this.clickOnceAnswer = false;
        if (this.language.language == "English") {
          this.messages.push({
            isBot: false,
            content: "Return To The Previous List",
            id: 7,
          });
          const video = document.getElementById("send-video");
          video.play();
        } else {
          this.messages.push({
            isBot: false,
            content: "الرجوع الي القائمه السابقه",
            id: 7,
          });
          const video = document.getElementById("send-video");
          video.play();
        }
        ChatbotService.getQuestionAfterSendLanguage(this.language).then(
          (data) => {
            this.messages.push({
              isBot: true,
              content: data.data.questions,
              id: 3,
            });
            const video = document.getElementById("recive-video");
            video.play();
          }
        );
      }
    },
  },
};
</script>

<style scoped>
.chat-button {
  position: fixed;
  bottom: 35px;
  right: 30px;
  border-radius: 50%;
}
.img {
  width: 40px;
  height: 40px;
}
.chatbot {
  position: fixed;
  bottom: 85px;
  right: 30px;
  width: 45rem;
  height: 45rem;
  border-radius: 15px;
  box-shadow: -5px 0 10px rgba(0, 0, 0, 0.3), 5px 0 10px rgba(0, 0, 0, 0.3);
  background-color: white;
  display: none;
}

.chat {
  width: 45rem;
  background-color: #3bb77e;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #ffba43;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
}

.chat-container {
  padding: 10px;
  overflow-y: auto;
  height: 40rem;
}

img {
  width: 30px;
  height: 30px;
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
  border-radius: 2px;
  color: black;
  font-size: 17px;
}

.user-message {
  display: flex;
  justify-content: end;
  width: 100%;
  /* #d0edff */
}

.user-message-content {
  background-color: #3bb77e;
  padding: 10px;
  width: fit-content;
  color: white;
  border-radius: 2px;
  font-size: 17px;
}

#recive-video {
  display: none;
}

#send-video {
  display: none;
}
</style>
