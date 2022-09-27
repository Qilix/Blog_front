<template>
  <v-container>
    <v-card
      class="mx-auto mb-8 py-1 px-4 elevation-13 rounded-lg"
      max-width="1000"
    >
      <v-card-title>
        <v-text-field
          v-model="title"
          :rules="titleRules"
          label="Заголовок"
          hint="Максимальная длина 255 символов"
        ></v-text-field>
      </v-card-title>
      <v-card-text>
  <v-textarea
      v-model="description"
      :rules="descriptionRules"
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
        <div v-if="error" class="text-center ma-2">
        <v-snackbar
            v-model="snackbar"
        >
          {{ error }}

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
      </v-card-actions>
    </v-card>

  </v-container>

</template>

<script>
import Login from '../components/Login.vue'
import Tiptap from '../components/Tiptap.vue';
import { eventBus } from '../main'
import {createArticle, createComment} from '../api/instance';

export default {
  name: "CreateArticle",
  components: {
    Tiptap,
    Login,
  },
  props:{
    id: String || Number,
  },
  data(){
    return {
      title: '',
      text:'',
      description: '',
      sub_only: false,

      snackbar: false,
      error: null,

      titleRules:[
        v => !!v || 'Введите название',
        v => v.length <= 255 || 'Название не может быть длиннее 255 символов',
      ],
      descriptionRules:[
        v => !!v || 'Введите описание',
      ],
      textRules:[
        v => !!v || 'Введите текст',
      ],

    }
  },

  methods:{
    settext(content){
      this.text = content;
    },
    create(){
        if (!this.$store.getters.checkUser) {
          eventBus.$emit('checkUser')
        } else {
          createArticle({
            title: this.title,
            description: this.description,
            text: this.text,
            sub_only: this.sub_only,
          }).then(res => {
            this.$router.push({
              name: 'article',
              params: {id: res.data.id}
            })
          }).catch((err) => {
            if (err.response.status == 422) {
              this.snackbar = true
              this.error = err.response.data.message
            }
          })
        }
      },
      update(){

      },

      edit(){
        if(this.id){
          this.create()
        }
        else{
          this.update()
        }
      }
  },

  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },

  mounted() {
    this.$store.dispatch('statusUser');
    },
}
</script>

<style
    scoped>

</style>