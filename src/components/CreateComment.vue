<template>
  <v-card
      color="grey lighten-5"
      elevation="0">
    <v-textarea
        v-model="body"
        placeholder="Введите комментарий"
        auto-grow
        row-height="1"
        @click="buttons = true"
    ></v-textarea>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          v-if="buttons"
          color="blue darken-1"
          text
          @click="buttons = false"
      >
        Закрыть
      </v-btn>
      <v-btn
          v-if="buttons"
          color="blue darken-1"
          text
          @click="create"
      >
        Написать
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {createComment} from "../api/instance";
import {eventBus} from "../main";

export default {
  name: "CreateComment",

  props: {
    articleId: String | Number,
    commentId: String | Number,
  },
  data() {
    return {
      buttons: false,
      body: null,
    }
  },

  methods: {
    create() {
      if (!this.$store.getters.checkUser) {
        eventBus.$emit('checkUser')
      } else {
        createComment(this.articleId, {
          body: this.body,
        }).then(res => {
          this.$emit('updatePage')
          this.body = null
          this.buttons = false
        })
      }
    },
    update() {

    }
  },

  computed: {
    user() {
      return this.$store.getters.checkUser
    }
  },
}
</script>

<style
    scoped>

</style>