<template>
  <v-container
      v-if="!user">
    <v-dialog
        v-model="dialog"
        width="600"
    >
      <template
          v-slot:activator="{ on, attrs }">
        <v-btn
            color="error"
            dark
            v-bind="attrs"
            v-on="on"
            width="200"
        >
          Вход
        </v-btn>
      </template>
      <v-card>
        <v-card-title
            class="text-h5 d-flex justify-center mr-5">
          <h3>
            Вход</h3>
        </v-card-title>
        <v-col
            cols="12">
          <v-text-field
              v-model="email"
              label="Email"
              required
          ></v-text-field>
        </v-col>
        <v-col
            cols="12">
          <v-text-field
              v-model="password"
              label="Пароль"
              type="password"
              required
          ></v-text-field>
        </v-col>
        <v-card-actions
            class="d-flex justify-center">
          <v-btn
              @click="login"
              color="primary"
              class="mr-4"
              width="150"
          >
            Войти
          </v-btn>
        </v-card-actions>
        <v-card-text
            class="d-flex justify-center mr-8 mt-3">
          <v-alert
              class="text-md-center"
              v-if="message"
              dense
              text
              width="auto"
              type="error"
          >
            {{
              message
            }}
          </v-alert>
        </v-card-text>
        <v-card-subtitle
            class="d-flex justify-center mr-5">
          У
          вас
          нет
          аккаунта?
          <a class="ml-1"
             @click="changeDialog">Регистрация</a>
        </v-card-subtitle>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="register"
        width="600"
    >
      <v-card>
        <v-card-title
            class="text-h5 d-flex justify-center mr-5">
          <h3>
            Регистрация</h3>
        </v-card-title>
        <v-col
            cols="12">
          <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Имя"
              required
          ></v-text-field>
        </v-col>
        <v-col
            cols="12">
          <v-text-field
              v-model="email"
              :rules="emailRules"
              type="email"
              label="Email"
              required
          ></v-text-field>
        </v-col>
        <v-col
            cols="12">
          <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Пароль"
              type="password"
              required
          ></v-text-field>
        </v-col>
        <v-col
            cols="12">
          <v-text-field
              v-model="password_confirmation"
              :rules="password_confirmationRules"
              label="Подтвердите пароль"
              type="password"
              required
          ></v-text-field>
        </v-col>
        <v-card-actions
            class="d-flex justify-center">
          <v-btn
              @click="registration"
              color="primary"
              class="mr-4 "
              width="auto"
          >
            Зарегистрироваться
          </v-btn>
        </v-card-actions>
        <v-card-text
            class="d-flex justify-center mr-8 mt-3">
          <v-alert
              class="text-md-center"
              v-if="message"
              dense
              text
              width="auto"
              type="error"
          >
            {{
              message
            }}
          </v-alert>
        </v-card-text>
        <v-card-subtitle
            class="d-flex justify-center">
          Уже
          есть
          аккаунт?
          <a class="ml-1"
             @click="changeDialog">Войти</a>
        </v-card-subtitle>
      </v-card>
    </v-dialog>
  </v-container>

  <v-container
      v-else>
    <v-menu
        top
        :offset-y="true">
      <template
          v-slot:activator="{ on, attrs }">
        <v-list-item
            link
            v-bind="attrs"
            v-on="on"
        >
          <v-list-item-content>
            <v-list-item-title
                class="text-h5">
              {{
                user.name
              }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{
                user.email
              }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>
              mdi-menu-up
            </v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>

      <v-list>
        <v-list-item
            v-for="item in this.items"
            :key="item.title"
            link
            @click="actionsUser(item.action)"
        >
          <v-list-item-title>
            {{
              item.title
            }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script>
import {
  loginUser,
  registerUser,
  logoutUser
} from '../api/instance';
import {eventBus} from '../main'

export default {
  data() {
    return {
      items: [
        {
          title: 'Мои статьи',
          action: "userArticles",
        },
        {
          title: 'Создать запись',
          action: 'createArticle',
        },
        {
          title: 'Выйти',
          action: "logout",
        },

      ],

      message: null,
      register: false,
      dialog: false,
      currentUser: null,

      name: "",
      email: "",
      password: "",
      password_confirmation: null,

      nameRules: [
        v => !!v || 'Введите имя',
      ],
      emailRules: [
        v => !!v || 'Введите email',
      ],
      passwordRules: [
        v => !!v || 'Введите пароль',
        v => v.length >= 6 || 'Пароль должен быть не менее 6 символов'
      ],
      password_confirmationRules: [
        v => !!v || 'Повторите пароль',
      ],
    }
  },

  methods: {
    changeDialog: function () {
      this.dialog = !this.dialog;
      this.register = !this.register;

      this.name = this.email = this.password = this.password_confirmation = '';
    },

    login() {
      loginUser({
        email: this.email,
        password: this.password,
      }).then(res => {
        this.currentUser = res.data.user;
        this.$store.commit("setUser", this.currentUser);
        this.message = null;
      }).catch((err) => {
        if (err.response.status == 401) {
          this.message = err.response.data.message;
        }
      })
    },

    registration() {
      registerUser({
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      }).then(res => {
        this.currentUser = res.data.user;
        this.$store.commit("setUser", this.currentUser);
        this.register = false;
        this.message = null;
      }).catch((err) => {
        if (err.response.status == 422) {
          this.message = err.response.data.message;
        }
      })
    },

    actionsUser(action) {

      switch (action) {
        case 'logout':
          logoutUser();
          this.dialog = false;
          this.currentUser = null;
          this.$store.commit("setUser", this.currentUser);
          break;
        case 'createArticle':
          this.$router.push({name: "createarticle"})
          break;
        case 'userArticles':
          this.$router.push({name: "userarticles"})
          break;
      }
    },
  },

  computed: {
    user() {
      return this.$store.state.user.user;
    }
  },

  mounted() {
    eventBus.$on('checkUser', data => {
      this.dialog = true;
    })
    this.$store.dispatch('statusUser');
  },
}
</script>

<style>
.v-dialog .v-card .v-card__text {
  padding: 0 24px 0;
}
</style>