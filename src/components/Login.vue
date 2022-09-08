<template>
    <div>
    <v-dialog
      v-model="dialog"
      width="600"
    >
      <template v-slot:activator="{ on, attrs }">
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
        <v-card-title class="text-h5 d-flex justify-center mr-5">
          <h3>Вход</h3>
        </v-card-title>
        <v-col cols="12">
          <v-text-field
              v-model="email"
              label="Email"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
              v-model="password"
              label="Пароль"
              type="password"
              required
          ></v-text-field>
        </v-col>
        <v-card-actions class="d-flex justify-center">
          <v-btn
          @click="login"
          color="primary"
              class="mr-4 "
              width="150"
          >
            Войти
          </v-btn>
          </v-card-actions>
        <v-card-subtitle class="d-flex justify-center mr-5 mt-5">
          У вас нет аккаунта?
          <a class="ml-1" @click="changeDialog">Регистрация</a>
        </v-card-subtitle>
      </v-card>
    </v-dialog>
      <v-dialog
          v-model="register"
          width="600"
      >
        <v-card>
          <v-card-title class="text-h5 d-flex justify-center mr-5">
            <h3>Регистрация</h3>
          </v-card-title>
          <v-col cols="12">
            <v-text-field
                v-model="name"
                label="Имя"
                required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
                v-model="email"
                type="email"
                label="Email"
                required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
                v-model="password"
                label="Пароль"
                type="password"
                required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
                v-model="password_confirmation"
                label="Подтвердите пароль"
                type="password"
                required
            ></v-text-field>
          </v-col>
          <v-card-actions class="d-flex justify-center">
            <v-btn
                @click="registration"
                color="primary"
                class="mr-4 "
                width="auto"
            >
              Зарегистрироваться
            </v-btn>
          </v-card-actions>
          <v-card-subtitle class="d-flex justify-center mr-5 mt-5">
            Уже есть аккаунт?
            <a class="ml-1" @click="changeDialog">Войти</a>
          </v-card-subtitle>
        </v-card>
      </v-dialog>

  </div>
</template>

<script>
import { loginUser, registerUser } from '../api/instance';

export default {
  data() {
    return {
      register: false,
      dialog: false,
      currentUser: null,

      name: "",
      email: "author@mail.ru",
      password: "123123123",
      password_confirmation: null,
    }
  },

  methods: {
    changeDialog: function () {
      this.dialog = !this.dialog;
      this.register = !this.register;

      this.email = this.password = '';
    },
    login() {
      this.currentUser = loginUser(this.email, this.password)
      console.log(this.currentUser);
    },
    registration() {
      this.currentUser = registerUser(this.name, this.email, this.password, this.password_confirmation)
      console.log(this.currentUser);
    }
  },

  computed: {
    user() {
      console.log(this.$store.state.user.user)
      return this.$store.state.user.user;
    }
  },

  mounted() {
    this.$store.dispatch('statusUser', this.currentUser);
  },
}
</script>