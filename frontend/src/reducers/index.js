//combine different reduceres here
import { combineReducers } from 'redux'
import CategoriesReducer from './CategoryReducer';
import CommentReducer from './CommentReducer';
import PostReducer from './PostReducer';

const rootReducer = combineReducers({
    categories: CategoriesReducer,
    posts: PostReducer,
    comments: CommentReducer
});

export default rootReducer;