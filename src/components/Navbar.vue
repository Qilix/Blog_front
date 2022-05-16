<template>
  <v-card 
  class="d-flex justify-start mb-6"
  height="100vh" 
  background="green"
  >

    <v-navigation-drawer 
    class="grey lighten-3" 
    width="380"
    permanent
    >

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <h1>QilBlog</h1>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list nav dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>  
        <div class="login">
            <Login/>
        </div>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  // import CreateQuote from '@/components/CreateQuote'
  import Login from '@/components/Login'

  export default {
    components: {
      // CreateQuote
      Login
    },
    data() {
      return {
        items: [{
            title: 'Главная',
            icon: 'mdi-view-dashboard'
          },
          {
            title: 'О нас',
            icon: 'mdi-help-box'
          },
        ],
        right: null,
      }
    },
  };
</script>

<style>
  .text-h6 {
    padding: 35px 0 10px;
    text-align: center;
  }

  .login {
    position:absolute;
    bottom: 100px;
  }
</style>