<template>
  <v-container
      v-if="error">
    <v-card
        class="mx-auto mb-8 py-1 px-4 elevation-13 rounded-lg"
        min-width="1000">
      <v-card-title
          class="justify-center">
        {{
          error
        }}
      </v-card-title>
      <v-card-text
          class="pt-1 d-flex justify-center">
        <v-btn
            to="/"
            plain
            color="green"
            outlined>
          Вернуться
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
  <v-container
      v-else-if="article">
    <v-card
        class="mx-auto mb-8 py-1 px-4 elevation-13 rounded-lg"
        max-width="800">
      <v-card-title>
        <h1>
          {{
            article.title
          }}</h1>
      </v-card-title>
      <v-card-subtitle>
        <h5>
          {{
            article.author
          }}</h5>
      </v-card-subtitle>
      <v-card-text
          v-html="article.text">
        {{
          article.text
        }}
      </v-card-text>
    </v-card>
    <div
        class="comments">
      <h1 class="mx-auto">
        Комментарии</h1>
      <CreateComment
          @updatePage="refresh"
          :articleId="this.id"
      />
      <v-card
          v-for="comment in article.comments"
          :key="comment.id"
          class="mt-2"
          elevation="1"
          color="grey lighten-5"
      >
        <div
            v-show="!comment.edit_mode">
          <v-card-title>
          <span>
              {{
                comment.author_name
              }}
              <v-card-subtitle>
              {{ correctDate(comment.updated_at) }}
              </v-card-subtitle>
          </span>
            <v-spacer></v-spacer>
            <v-menu
                v-if="user && comment.author_id == user.id"
                bottom
                :offset-y="true"
            >
              <template
                  v-slot:activator="{ on, attrs }">
                <v-btn
                    dark
                    icon
                    v-bind="attrs"
                    v-on="on"
                    color="black"
                >
                  <v-icon>
                    mdi-dots-vertical
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                    @click="editMode(comment, comment.id, comment.body)"
                >
                  <v-list-item-title>
                    Изменить
                  </v-list-item-title>
                </v-list-item>

                <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="600"
                >
                  <template
                      v-slot:activator="{ on, attrs }">
                    <v-list-item
                        v-bind="attrs"
                        v-on="on"
                    >
                      <v-list-item-title>
                        Удалить
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <v-card>
                    <v-card-title
                        class="text-h6">
                      Вы
                      уверены
                      что
                      хотите
                      удалить
                      комментарий?
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          text
                          @click="dialog = false"
                      >
                        Отмена
                      </v-btn>
                      <v-btn
                          color="error"
                          @click="deleteCom(article.id, comment.id)"
                      >
                        Удалить
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text>
            {{
              comment.body
            }}
          </v-card-text>
        </div>
        <div
            v-show="comment.edit_mode">
          <v-textarea
              v-model="commentBody"
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
                @click="buttons = comment.edit_mode =  false"
            >
              Закрыть
            </v-btn>
            <v-btn
                v-if="buttons"
                color="blue darken-1"
                text
                @click="updateCom(article.id, comment.id)"
            >
              Обновить
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </div>
  </v-container>

</template>


<script>
import {
  getArticleById,
  deleteComment,
  updateComment
} from '../api/instance';
import CreateComment
  from '../components/CreateComment';

export default {

  name: 'Article',

  props: {
    id: String | Number,
    page: Number,
  },

  components: {
    CreateComment
  },

  data() {
    return {
      article: null,
      error: null,

      commentId: null,
      commentBody: null,
      date: null,

      buttons: false,
      dialog: false,
    }
  },

  methods: {
    refresh() {
      getArticleById(this.id).then((result) => {
        this.article = result.data;
        if (this.article.status == 204) {
          console.log('error');
          return;
        }
      })
    },
    correctDate(date){
      console.log(date)
      return new Date(date).toLocaleString()
    },
    deleteCom(articleId, commentId) {
      deleteComment(articleId, commentId).then((result) => {
        this.refresh()
        this.dialog = false
      })
    },

    editMode: function (comment, commentId, commentBody) {
      this.$set(comment, 'edit_mode', true)
      this.commentId = commentId
      this.commentBody = commentBody
    },

    updateCom(articleId, commentId, comment) {
      updateComment(articleId, commentId, {
        body: this.commentBody
      }).then((result) => {
        this.refresh()
      })
    },
  },
  mounted() {
    this.refresh()
  },
  computed: {
    user() {
      return this.$store.getters.checkUser
    }
  },

}
</script>

<style>
.v-card__subtitle, .v-card__text, .v-card__title {
  padding: 8px 5px;
}
</style>