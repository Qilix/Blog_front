import {getUser} from '../api/instance';

export default {

    state: {
        user: null,
    },

    mutations: {
        setUser(state, user) {
            state.user = user;
        },
    },

    actions: {
        statusUser(context) {
            getUser().then((result) => {
                this.user = result.data
                context.commit('setUser', this.user)
            }).catch((err) => {
                if (err.response.status == 401) {
                    //
                }
            })
        }
    },
    getters: {
        checkUser(state) {
            return state.user
        }
    },
}

