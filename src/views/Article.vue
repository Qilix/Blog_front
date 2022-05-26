<template>
    <v-container>
        <v-card
        class="mx-auto mb-8 py-1 px-4 elevation-13 rounded-lg"
        max-width="600">
            <v-card-title>
                <h1>Статья 1 </h1>
            </v-card-title>
            <v-card-subtitle>
                <date-format :date="quote.created_at"></date-format>
            </v-card-subtitle>
            <v-card-text>
                Текст
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>

export default ({
    name: Article,
    
    props:{
        id: Number,
        page: Number,
    },


})
</script>
