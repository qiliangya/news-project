import React from 'react';
import ReactDOM from 'react-dom';
//import store from './store';
//import { Provider } from 'react-redux';

import App from './modules/public/app' 

import {Router,Route,hashHistory,IndexRoute} from 'react-router';


ReactDOM.render(
    //<Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
            </Route>
        </Router>,
    //</Provider>,
    document.getElementById('app')
)
