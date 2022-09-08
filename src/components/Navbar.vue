<template>
  <div class="nav">
  <v-card 
  class="d-flex justify-start mb-6"
  height="100%" 
  background="green"
  
  >

    <v-navigation-drawer 
    class="grey lighten-3"
    width="380"
    permanent
    >
    <div class="d-flex justify-space-between flex-column h-100">
      <v-list nav dense>
        <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <h1>QilBlog</h1>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
        <v-list-item v-for="item in items" :key="item.title" link  @click="$router.push({ name: item.name})">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="login">
        <Login/>
      </div>
    </div>
    </v-navigation-drawer>
  </v-card>
  </div>
</template>

<script>
  import Login from '@/components/Login'

  export default {
    components: {
      Login
    },
    data() {
      return {
        items: [{
            title: 'Главная',
            name: 'home',
            icon: 'mdi-view-dashboard'
          },
          {
            title: 'О нас',
            name: 'about us',
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
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  .nav{
    height: 100vh;
    position: sticky;
    top: 0;
  }
  .h-100{
    height: 100%;
  }
</style>