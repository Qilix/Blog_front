<template>
  <v-app>
      <v-container class="grey lighten-5" fluid>
      <v-row>
          <Navbar/>
        <v-col cols="8">
          <v-main>
          <router-view/>
          </v-main>
        </v-col>
      </v-row>
      </v-container>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Home from '@/views/Home'

export default {
  name: 'App',
  components: {
    Navbar,Home
  }
};
</script>

