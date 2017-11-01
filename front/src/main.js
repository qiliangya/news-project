import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routes} from './routes';
import axios from 'axios'
import VueAxios from 'vue-axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import {store} from './store';		//由于默认就是index文件，所以不需要加上index.js
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';



Vue.use(ElementUI)
Vue.use(VueRouter);
Vue.use(VueAxios, axios)

const router = new VueRouter({
	routes:routes, // 可以直接写成routes
	mode:'history' // mode设置成history，那么地址就可以请求http://localhost:8080/user
});


if(!store.state.login){		//做的判断，如果未登录状态，则不允许访问
	router.push('/login');	//路由跳转到登录页
}



new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
})



