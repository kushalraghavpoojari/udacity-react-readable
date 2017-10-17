import {
    FETCH_COMMENTS, FETCH_COMMENT, CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, VOTE_COMMENT
} from '../actions/types'

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_COMMENTS:
            return action.payload;
        case DELETE_COMMENT:
            return action.payload;
        case FETCH_COMMENT:
            return action.payload;
        case EDIT_COMMENT:
            return action.payload
            // return state.map(comment => {
            //     if(comment.id === action.id) {
            //     comment = action.payload
            //     }
            //     return comment
            // })
        case VOTE_COMMENT:
            return  {
                ...state,
                [action.payload.id]: action.payload
            };
        case CREATE_COMMENT:
            return state
        default:
            return state;
    }
}