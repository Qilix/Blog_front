<template>
  <v-container v-if="this.articles.data && this.articles.data.length">
    <v-card
        v-for="article in this.articles.data" :key="article.id"
        class="mt-1 mx-auto"
        max-width="600"
    >
      <v-card-title>
        <span class="text-h5">
          <p class="text-h4 text--primary">
          {{article.title}}
        </p>
        </span>
        <v-spacer></v-spacer>
        <v-menu
            bottom
            :offset-y="true"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
                color="black"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$router.push({ name: 'createarticle', params:{id: article.id} })">
              <v-list-item-title>Изменить</v-list-item-title>
            </v-list-item>
            <v-dialog
                v-model="dialog"
                persistent
                max-width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-list-item
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-list-item-title>Удалить</v-list-item-title>
                </v-list-item>
              </template>
              <v-card>
                <v-card-title class="text-h6">
                  Вы уверены что хотите удалить статью?
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
                      @click="deleteArt(article.id)"
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
        {{article.description}}
      </v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4" class="btn btn-outline-light" @click="$router.push({ name: 'article', params:{id: article.id} })">
          Перейти к статье
        </v-btn>
      </v-card-actions>
    </v-card>
    <div class="pt-10 text-center">
      <v-pagination
          v-model="currentPage"
          :length="maxPage"
      ></v-pagination>
    </div>
    <div v-if="message" class="text-center ma-2">
      <v-snackbar
          v-model="snackbar"
      >
        {{ message }}
        <template v-slot:action="{ attrs }">
          <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
  <v-container v-else>
    <v-card
        class="text-center mt-1 mx-auto"
        max-width="600"
 >
      <v-card-text>
        <h1>У вас нет Записей</h1>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {
  getUserArticles,
  deleteArticle,
} from '../api/instance';
export default {
  name: "UserArticles.vue",

  data() {
    return {
      dialog: false,

      snackbar: false,
      message: null,

      currentPage: 1,
      articles: [],
      maxPage: null,
      status: false,
    }
  },

  methods:{
    updateArts(){
      getUserArticles(this.currentPage).then((result) => {
        this.articles = result.data
        this.maxPage = Math.ceil(this.articles.total / 5)
      })
    },
    deleteArt(id){
      this.snackbar = true
      deleteArticle(id).then((result) =>{
        this.message = result.data.message
        this.status = true
      }).catch((err) => {
        if (err.response.status == 422) {
          this.message = err.response.data.message
        }
      })
      this.dialog = false
    }
  },

  mounted() {
      this.updateArts()
  },

  watch: {
    currentPage(){
      this.updateArts()
    },
    status: function(){
      this.status = false,
      this.updateArts()
    },
  },
}
</script>
