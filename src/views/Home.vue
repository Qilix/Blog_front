<template>
    <v-container v-if="!articles.data">
        <v-card class="mx-auto mb-8 py-2 px-4 elevation-13 rounded-lg" max-width="600" v-for="n in 3" :key="n">
            <v-skeleton-loader type="article"></v-skeleton-loader>
            <v-skeleton-loader class="small-button-skelet" type="button"></v-skeleton-loader>
            <v-skeleton-loader class="my-4 big-button-skelet" type="button"></v-skeleton-loader>
            <div></div>
        </v-card>
    </v-container>
    <v-container v-else>
        <v-card v-for="article in articles.data" :key="article.id" class="mt-7 mx-auto" max-width="700"
            max-height="350" elevation="2" outlined>
            <v-card-text>
                <p class="text-h4 text--primary">
                    {{article.title}}
                </p>
                <p class="ml-3 auth">
                    {{article.author}}
                </p>
                {{article.description}}
            </v-card-text>
            <v-card-actions>
                <v-btn text color="deep-purple accent-4" class="btn btn-outline-light" @click="$router.push({ name: 'article', params:{id: article.id} })">
                    Читать
                </v-btn>
            </v-card-actions>
        </v-card>
    <div class="pt-10 text-center">
        <v-pagination
        v-model="currentPage"
        :length="maxPage"
        ></v-pagination>
    </div>
    </v-container>
</template>

<script>
    export default ({
        name: 'Home',
        data() {
            return {
                currentPage: 1,
            }
        },

        computed: {
            articles() {
                return this.$store.state.article.articles;
            },
            page() {
                return this.$store.state.article.page;
            },
            maxPage() {
                return this.$store.state.article.maxPage;
            }
        },

        mounted() {
            this.$store.dispatch('updateArticles', this.currentPage);
        },

        watch:{
            currentPage(){
                this.$store.dispatch('updateArticles', this.currentPage);
            },
        },
    })
    
</script>

<style>
    .auth {
        font-family: Comic Sans MS, Comic Sans, cursive;
        font-weight: 1000;
    }
</style>