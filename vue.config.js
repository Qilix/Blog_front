const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

  devServer: {
    host:"valllee.ru",
  },

  transpileDependencies: [
    'vuetify'
  ]
})
