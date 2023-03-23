import {combineReducers} from 'redux';
import getPostReducer from './getPostReducer';
import getPostLikeReducer from './getPostLikeReducer';
import getPostCommentReducer from './getPostCommentReducer';

const rootReducer=combineReducers({getPostReducer,getPostLikeReducer,getPostCommentReducer});

export default rootReducer;