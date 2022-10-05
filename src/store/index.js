import Vue from 'vue'
import Vuex from 'vuex'

import article from './article.js'
import user from './user.js'

Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        article,
        user,
    },
})
