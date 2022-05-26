<template>
    <v-container>
        <v-card
        class="mt-7 mx-auto elevation-5 rounded-lg"
        max-width="700"
        max-height="350"
        >
            <v-card-title class="justify-center">
                Упс, страница не найдена
            </v-card-title>
            <v-card-text class="d-flex justify-center">
                <v-btn to="/" plain color="deep-purple accent-4" outlined>
                    Вернуться
                </v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: 'PageNotFound',
    }
</script>

<style>
</style>