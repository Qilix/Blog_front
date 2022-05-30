import axios from 'axios'

const ax = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})

export const getArticleById = (id) => {
    return ax.get('api/' + id);
};

export const getArticles = (page) => {
    return ax.get('api/?page=' + page
    );
};