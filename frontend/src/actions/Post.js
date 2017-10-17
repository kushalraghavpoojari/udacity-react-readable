import axios from 'axios';
import _ from 'lodash';
import {api, headers, createId} from '../utils/helpers'
import {FETCH_POSTS, CREATE_POST, DELETE_POST, FETCH_POST, EDIT_POST, VOTE_POST} from './types'

axios.defaults.headers.common['Authorization'] = headers

export function votePost(id, option) {
    const data = {option}
    return dispatch => {axios.post(`${api}/posts/${id}`, data)
            .then(res => dispatch(successFunction(res.data, id)))
            .catch(err => console.log(err))
    }
}

function successFunction(data, id) {
    return {
        type: VOTE_POST,
        payload: data,
        postId: id
    }
}


export function fetchPosts(value) {
    return  dispatch => {axios.get(`${api}/posts`)
        .then(res => dispatch(fetchPostsSuccess(res.data, value)))
    }
}

function fetchPostsSuccess(data, value) {
    let payload = _.reverse(_.sortBy(data, value))
    return {
        type: FETCH_POSTS,
        payload: payload
    }
}

export function createPost(values, callback) {
    const { title, body, author, category } = values;
    const data = {
        id: createId(),
        timestamp: Date.now(),
        title,
        body,
        author,
        category
    }
    return  dispatch => {axios.post(`${api}/posts`, data)
        .then(res => {
            callback()
            dispatch(createPostSuccess(res.data))
        })
    }
}

function createPostSuccess(data) {
    return {
        type: CREATE_POST,
        payload: data
    }
}

export function deletePost(id, callback) {
    return dispatch => {
        axios.delete(`${api}/posts/${id}`)
            .then(res => {
                callback()
                dispatch(deletePostSuccess(res,id));
            });        
    }
}

function deletePostSuccess(res,data) {
    console.log(res.status)
    return {
        type: DELETE_POST,
        payload: data
    }
}

export function fetchPost(id) {
    return dispatch => {
        axios.get(`${api}/posts/${id}`)
            .then(res => dispatch(fetchPostSuccess(res.data)));
        
    }
}

function fetchPostSuccess(data) {
    return {
        type: FETCH_POST,
        payload: data
    };
}

export function editPost(id, values, callback) {
    
    return dispatch => {
        axios.put(`${api}/posts/${id}`, values)
            .then(res => {
                callback();
                dispatch(editPostSuccess(res.data, id))
            });
        
    }
}

function editPostSuccess(data, id) {
    return {
        type: EDIT_POST,
        payload: data,
        postId: id
    };
}
