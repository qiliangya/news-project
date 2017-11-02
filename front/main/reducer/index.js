import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import cate from './cate';
export default combineReducers({
    cate,
    routing:routerReducer
})