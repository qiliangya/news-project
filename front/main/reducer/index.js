import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import cate from './cate';
import news from './news';
export default combineReducers({
    cate,
    news,
    routing:routerReducer
})