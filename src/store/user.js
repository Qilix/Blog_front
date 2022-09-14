import { getUser } from '../api/instance';

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
                if (result.status === 200) {
                    this.user = result.data
                    context.commit('setUser', this.user)
                    // console.log(this.user);
                }
                else{
                    // console.log("Not user");
                }

            });
        },
    },
}

