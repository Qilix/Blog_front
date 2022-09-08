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
        @click="dialog = false"
    >
      Save
    </v-btn>
  </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Comment",

  data() {
    return {
      buttons: false,
      body: null,
    }
  },

  methods:{
    createCom(){

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