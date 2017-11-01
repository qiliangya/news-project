import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex);
Vue.use(VueAxios, axios)


export const store = new Vuex.Store({
	state:{
		login:false,		//登录状态
		userId:'',
		userName:'',
		cateList:[],
		newsList:[],
		commentsList:[]
	},
	getters:{
		login:state=>{
			return state.login
		},
		cateList:state=>{
			return state.cateList;
		},
		newsList:state=>{
			return state.newsList;
		},
		userId:state=>{
			return state.userId;
		},
		userName:state=>{
			return state.userName;
		}
	},
	mutations:{
		checkLogin:(state,payload)=>{
			state.login = payload;		//commit
		},
		cateListInit:(state,payload)=>{
			state.cateList = payload;
		},
		getNewsData:(state,payload)=>{
			state.newsList = payload.rows;
		},
		getUser:(state,payload)=>{
			state.userId = payload._id;
			state.userName = payload.name;
		}
	},
	actions:{
		checkLogin:({commit},payload) =>{	
			commit('checkLogin',payload);	//dispatch
		},
		cateListInit:({commit},payload) =>{
			Vue.axios.post('http://localhost:3000/cate/list')
			.then(msg=>{
				commit('cateListInit',msg.data);
			});
		},
		getNewsData:({commit},payload)=>{
			Vue.axios.post('http://localhost:3000/news/list')
			.then(msg=>{
				commit('getNewsData',msg.data);
			})
		},
		getUser:({commit},payload)=>{
			commit('getUser',payload);
		}
	}
})