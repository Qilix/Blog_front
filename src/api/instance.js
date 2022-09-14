import axios from 'axios'

const ax = axios.create({
    withCredentials: true,
    baseURL: 'http://valllee.ru:8000/',

})

export const getArticleById = (id) => {
    return ax.get('api/posts/' + id);
};

export const getArticles = (page) => {
    return ax.get('api/posts/?page=' + page);
};

export const getUser = () => {
    return ax.get('api/users/');
};

export const loginUser = (data) => {
    return ax.post('api/users/login', data);
};

export const registerUser = (data) => {
    return ax.post('api/users/register', data);
};

export const logoutUser = () => {
    return ax.post('api/users/logout')
};

export const createComment = (id, data) => {
    return ax.post('api/posts/' + id +'/comments/', data)
};

export const updateComment = (id, comment_id) => {
    return ax.put('api/posts/' + id + '/comments/' + comment_id);
};

export const deleteComment = (id, comment_id) => {
    return ax.delete('api/posts/' + id + '/comments/' + comment_id);
};

