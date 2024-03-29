import {getArticles} from '../api/instance';

export default {

    state: {
        articles: [],
        maxPage: null,
        page: 1,
    },

    mutations: {
        updateArticles(state, articles) {
            state.articles = articles;
        },
        updatePage(state, page) {
            state.page = page;
        },
        updateMaxPage(state, maxPage) {
            state.maxPage = maxPage;
        }
    },

    actions: {
        updateArticles(context, page) {
            getArticles(page).then((result) => {
                const jsonRes = result.data
                context.commit('updateArticles', jsonRes)
                const maxPage = Math.ceil(jsonRes.total / 3)
                context.commit('updateMaxPage', maxPage)
                if (page > maxPage) {
                    context.commit('updatePage', maxPage);
                } else if (page < 1) {
                    context.commit('updatePage', 1);
                } else {
                    context.commit('updatePage', page);
                }
            });
        },
    },
}

