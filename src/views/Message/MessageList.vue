<template>
  <div>
    <BasePageHeader title="Message" description="Watch or listen to our messages!">
      <router-link
        v-if="$can('create-message')"
        to="/messages/create"
        class="btn btn-primary my-2"
        tag="button"
      >Create message</router-link>
    </BasePageHeader>

    <div class="container">
      <div class="py-3">
        <h3>Filter:</h3>
        <div class="form-group row">
          <div class="col-sm-6 mb-2">
            <BaseSelect label="Series" :options="selectSeries" v-model="filters.series" />
          </div>
          <div class="col-sm-6">
            <BaseSelect label="Speaker" :options="selectSpeakers" v-model="filters.speaker" />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-6 mb-2">
            <BaseSelect label="Author" :options="selectAuthors" v-model="filters.author" />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-6 mb-2">
            <BaseInput label="Limit" v-model="filters.limit" />
          </div>
        </div>
        <div class="form-check mb-2">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="filters.hasMedia"
            id="input-has-media"
          />
          <label class="form-check-label" for="input-has-media">Has Media</label>
        </div>
        <BaseButton btnClass="btn-primary" @click.native="pageChangeHandle(1)">Get messages</BaseButton>
      </div>
    </div>
    <transition name="fade" @enter="scrollToBottom" appear>
      <div v-if="messages.length > 0" class="album py-5 bg-light">
        <div class="container" id="messages_cont" ref="messages_cont">
          <transition-group name="slide" tag="div" class="row" @enter="scrollToBottom">
            <MessageItem v-for="(message, index) in messages" :key="index" :message="message" />
          </transition-group>
        </div>
      </div>
    </transition>
    <div class="container">
      <div class="py-3 pagination">
        <BasePagination
          v-if="pageCount > 1"
          :current-page="currentPage"
          :page-count="pageCount"
          class="testclass"
          :is-add-dots="true"
          @previousPage="pageChangeHandle('previous')"
          @nextPage="pageChangeHandle('next')"
          @loadPage="pageChangeHandle"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MessageItem from "../../components/MessageItem";
import MessageMixin from "../../mixins/Message";
export default {
  name: "MessageList",
  data() {
    return {
      messages: [],
      pageCount: 0,
      currentPage: 1,
      filters: {}
    };
  },
  methods: {
    async fetchMessages() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("fetchMessages", this.filters)
          .then(res => {
            this.messages = res.data;
            this.pageCount = Math.ceil(res.total / this.filters.limit);
            console.log(this.messages);

            if(this.messages.length > 0)
              resolve('success');
            else 
              reject('error');
          })
          .catch(err => {
            console.log(err);
            });
      });
    },
    pageChangeHandle(value) {
      switch (value) {
        case "next":
          this.currentPage += 1;
          break;
        case "previous":
          this.currentPage -= 1;
          break;
        default:
          this.currentPage = value;
      }
      this.filters.offset = (this.currentPage - 1) * this.filters.limit;
      this.fetchMessages().then( res => {
        // Reset page to first just in case no post is gotten for page requested for.
        if(res === "error") {
          this.currentPage = 1;
          this.fetchMessages();
        }
      });
    },
    scrollToBottom() {  
      var container = this.$refs["messages_cont"];
      container.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  },
  created() {
    // Get filter state if set in store
    if (this.$store.getters.getMessagesFilter) {
      // Copy dont reference filter so they can be modified caps of mutations
      this.filters = { ...this.$store.getters.getMessagesFilter };
    }

    // console.log(this.$cookies.get("authUser"));

    // Get messages
    if (this.$store.getters.getMessages.length > 0) {
      this.messages = this.$store.getters.getMessages;
    } else {
      this.fetchMessages();
    }

    // Update Page count and Current page
    this.pageCount = this.$store.getters.getMessagesPageCount;
    this.currentPage = this.$store.getters.getMessagesCurrentPage;
  },
  components: {
    MessageItem
  },
  mixins: [MessageMixin]
};
</script>

<style>
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave-active {
  transition: opacity 1s;
  opacity: 0;
}

.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 1s;
}

.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 1s;
  opacity: 0;
}

@keyframes slide-in {
  from {
    transform: translateY(50px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(50px);
  }
}
</style>
