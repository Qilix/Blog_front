import Vue from 'vue'
import Vuex from 'vuex'

import {
  getArticles
} from '../api/instance';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
  },

  mutations: {
    updateArticles(state, articles) {
      state.articles = articles;
    },
  },

  actions: {
    updateArticles(context){
      getArticles().then((result) =>{
        const jsonRes = result.data
        context.commit('updateArticles', jsonRes)
        console.log(jsonRes)
      });
    }
  },
})
