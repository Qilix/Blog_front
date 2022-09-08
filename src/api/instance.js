import axios from 'axios'

const ax = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/',

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

export const loginUser = (email, password) => {
    return ax.post('api/users/login', {
        email:email,
        password:password
    }).then( r =>{console.log(r)});
};

export const registerUser = (name, email, password, password_confirmation) => {
    return ax.post('api/users/register', {
        name:name,
        email:email,
        password:password,
        password_confirmation:password_confirmation
    }).then( r =>{console.log(r)});
};

export const logoutUser = () => {
    return ax.get('api/users/logout');
};

export const createComment = (id) => {
    return ax.post('api/posts/' + id +'/comments/' );
};

export const updateComment = (id, comment_id) => {
    return ax.put('api/posts/' + id + '/comments/' + comment_id);
};

export const deleteComment = (id, comment_id) => {
    return ax.delete('api/posts/' + id + '/comments/' + comment_id);
};

