import {
    FETCH_POSTS, FETCH_POST, CREATE_POST, DELETE_POST, EDIT_POST, VOTE_POST
} from '../actions/types'

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return action.payload;
        case FETCH_POST:
            return action.payload;
        case EDIT_POST:
            return state.map(post => {
                if(post.id === action.postId) {
                post = action.payload
                }
                return post
            })
        case VOTE_POST:
            return state.map(post => {
                if(post.id === action.postId) {
                post = action.payload
                }
                return post
            })
        case CREATE_POST:
            return action.payload;
        case DELETE_POST:
            return state.filter(post => post.id !== action.payload)
        default:
            return state;
    }
}