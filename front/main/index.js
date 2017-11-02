import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';

import App from './modules/App' 
import Login from './modules/Login'

import HomeConText from './modules/Home.js'
import DetailConText from './modules/Detail.js'

import {Router,Route,hashHistory,IndexRoute} from 'react-router';


ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                    <IndexRoute component={HomeConText} />
                    <Route path="/detail/:id" component={DetailConText}/>
            </Route>
            <Route path="/login" component={Login}></Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)
