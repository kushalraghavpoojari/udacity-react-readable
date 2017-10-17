import axios from 'axios';
import _ from 'lodash';
import {api, headers, createId} from '../utils/helpers'
import {FETCH_COMMENTS, CREATE_COMMENT, DELETE_COMMENT, FETCH_COMMENT, EDIT_COMMENT, VOTE_COMMENT} from './types'

axios.defaults.headers.common['Authorization'] = headers

//FETCH COMMENTS FOR A POST

export function fetchComments(id, value) {
    return  dispatch => {axios.get(`${api}/posts/${id}/comments`)
        .then(res => dispatch(fetchCommentsSuccess(res.data, value)))
    }
}

function fetchCommentsSuccess(data, value) {
    let payload = _.reverse(_.sortBy(data, value))
    return {
        type: FETCH_COMMENTS,
        payload: payload
    }
}

//DELETE A COMMENT

export function deleteComment(id, callback) {
    return dispatch => {
        axios.delete(`${api}/comments/${id}`)
            .then(res => {
                callback()
                dispatch(deleteCommentSuccess(res,id));
            });        
    }
}

function deleteCommentSuccess(data, id) {
    return {
        type: DELETE_COMMENT,
        payload: data
    }
}

//CREATE A NEW COMMENT FOR A POST

export function createComment(data,callback) {
    data.id = createId()
    data.timestamp = Date.now()
    return  dispatch => {axios.post(`${api}/comments`, data)
        .then(res => {
            callback()
            dispatch(createCommentSuccess(res.data))})
    }
}

function createCommentSuccess(data, id) {
    return {
        type: CREATE_COMMENT,
        payload: data
    }
}

//EDIT COMMENT

export function editComment(data, id, callback) {
    data.timestamp = Date.now()
    return dispatch => {
        axios.put(`${api}/comments/${id}`)
            .then(res => {
                callback();
                dispatch(editCommentSuccess(res.data, id))
            });
        
    }
}

function editCommentSuccess(data, id) {
    console.log(data)
    return {
        type: EDIT_COMMENT,
        payload: data,
        commentId: id
    };
}

//FETCH A COMMENT

export function fetchComment(id) {
    return dispatch => {
        axios.get(`${api}/comments/${id}`)
            .then(res => dispatch(fetchCommentSuccess(res.data)));
        
    }
}

function fetchCommentSuccess(data) {
    return {
        type: FETCH_COMMENT,
        payload: data
    };
}

//VOTE A COMMENT

export function voteComment(id, vote, callback) {
    return dispatch => {axios.post(`${api}/comments/${id}`, { option: vote })
        .then(res => {
            callback();
            dispatch({ type: VOTE_COMMENT, payload: res.data })
        })
        .catch(err => console.log(err))
    }
}
