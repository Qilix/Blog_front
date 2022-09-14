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
      Close
    </v-btn>
    <v-btn
        v-if="buttons"
        color="blue darken-1"
        text
        @click="create"
    >
      Save
    </v-btn>
  </v-card-actions>
  </v-card>
</template>

<script>
import {createComment} from "../api/instance";
export default {
  name: "Comment",

  data() {
    return {
      buttons: false,
      body: null,
    }
  },

  methods:{
    create(){
      console.log(createComment(this.id,this.body));
    }
},
    props:{
      id: String | Number,
},
}
</script>

<style
    scoped>

</style>