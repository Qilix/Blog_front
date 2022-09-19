<template>
  <v-container>
    <v-card
      class="mx-auto mb-8 py-1 px-4 elevation-13 rounded-lg"
      max-width="1000"
    >
      <v-card-title>
        <v-text-field
          v-model="title"
          label="Заголовок"
          hint="Максимальная длина 255 символов"
        ></v-text-field>
      </v-card-title>
      <v-card-text>
  <v-textarea
      v-model="description"
      name="input-7-1"
      label="Описание"
      hint="Hint text"
  ></v-textarea>
      </v-card-text>
      <v-card-text>
    <Tiptap @customChange="settext"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="$router.push({ name:'home' })"
        >
          Отмена
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="create"
        >
          Создать статью
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-container>
</template>

<script>
import Tiptap from '../components/Tiptap.vue';
import {createArticle, createComment} from '../api/instance';

export default {
  name: "CreateArticle",
  components: {
    Tiptap,
  },
  data(){
    return {
      title: '',
      text:'',
      description: '',
      sub_only: false,
    }
  },

  methods:{
    settext(content){
      console.log(content);
      this.text = content;
    },
    create(){
      console.log(createArticle({
            title: this.title,
            description: this.description,
            text: this.text,
            sub_only: this.sub_only,
          }
      ));
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    }
  },

  mounted() {
    this.$store.dispatch('statusUser');

    },
}
</script>

<style
    scoped>

</style>