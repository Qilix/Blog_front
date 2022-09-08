<template>
  <v-container v-if="error">
    <v-card
        class="mx-auto mb-8 py-1 px-4 elevation-13 rounded-lg"
        min-width="1000">
      <v-card-title class="justify-center">
        {{ error }}
      </v-card-title>
      <v-card-text class="pt-1 d-flex justify-center">
        <v-btn to="/" plain color="green" outlined>
          Вернуться
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
    <v-container v-else-if="article">
        <v-card
        class="mx-auto mb-8 py-1 px-4 elevation-13 rounded-lg"
        max-width="800">
            <v-card-title>
                <h1> {{ article.title }}</h1>
            </v-card-title>
            <v-card-subtitle>
                <h5>{{ article.author }}</h5>
            </v-card-subtitle>
            <v-card-text>
                {{ article.text }}
            </v-card-text>
        </v-card>
      <div class="comments">
        <h1 class="mx-auto">Комментарии</h1>
        <Comment/>
      <v-card v-for="comment in article.comments"
              :key="comment.id"
              class="mt-2"
              elevation="1"
              color="grey lighten-5"

      ><v-card-text>
          <span>
          <h4>{{ comment.author }}</h4>
          {{comment.updated_at }}<br>
          </span>
        {{ comment.body }}
      </v-card-text>
      </v-card>
      </div>
    </v-container>
</template>


<script>
import { getArticleById } from '../api/instance';
import Comment from '../components/Comment';

export default ({

    name: 'Article',
    
    props:{
        id: String | Number,
        page: Number,
    },

  components:{
      Comment
  },

    data(){
      return {
        article: null,
        error: null,

        createComment:false,
      }
    },

    mounted(){
      getArticleById(this.id).then((result) => {
        this.article = result.data;
        if (this.article.status == 204) {
          console.log('error');
          return;
        }
      })
    }


})
</script>
