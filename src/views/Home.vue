<template>
    <v-container v-if="!articles.length">
        <v-card class="mx-auto mb-8 py-2 px-4 elevation-13 rounded-lg"
        max-width="600" v-for="n in 3" :key="n">
            <v-skeleton-loader
                type="article"
                ></v-skeleton-loader>
            <v-skeleton-loader
                class="small-button-skelet"
                type="button"
                ></v-skeleton-loader>
            <v-skeleton-loader
                class="my-4 big-button-skelet"
                type="button"
                ></v-skeleton-loader>
            <div></div>
        </v-card>
    </v-container>
    <v-container v-else>
        <v-card v-for="article in articles" :key="article.id"
        class="mt-7 mx-auto"
        max-width="700"
        max-height="350"
        elevation="2"
        outlined
        >
            <v-card-text>
                <p class="text-h4 text--primary">
                    {{article.title}}
                </p>
                <p class="ml-3 auth">
                    <v-avatar
                    class="mr-1"
                    color="primary"
                    size="43"
                    >
                    <img
                    v-if="articles.avatar"
                    alt="Avatar"
                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                    >
                    </v-avatar>
                    {{article.author}}
                </p>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    text
                    color="deep-purple accent-4"
                >
                    Learn More
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>

export default ({
    name: 'Home',

    computed: {
        articles() {
            return this.$store.state.articles;
        },
    },

    mounted() {
        this.$store.dispatch('updateArticles');
        console.log(this.$store.state.articles)
    }

})

</script>

<style >
.auth{
        font-family: Comic Sans MS, Comic Sans, cursive;
        font-weight: 1000;
}
</style>