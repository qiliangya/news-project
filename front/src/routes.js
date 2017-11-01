
import Home from './components/home.vue'
import appHeader from './components/header.vue'
import appSider from './components/sider.vue'
import appFooter from './components/footer.vue'

import User from './components/user/user.vue'

import Category from './components/category/category.vue'

import News from './components/news/news.vue'
import Comments from './components/news/comments.vue'

import Upload from './components/upload/upload.vue'

import Login from './components/login.vue';

export const routes = [
	{ path:'/',components:{ //需要注意的是原来的component变成了components，复数
		default:Home
	},children:[
			{
				path:'/user',component:User
			},
			{
				path:'/category',component:Category
			},
			{
				path:'/news',component:News
			},
			{
				path:'/upload',component:Upload
			},
			{
				path:'/news/comments',component:Comments
			},
		]
	},
	{
		path:'/login',component:Login
	},
	{
		path:'*',redirect:'/'
	}
];

