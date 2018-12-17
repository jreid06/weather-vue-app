import Home from './components/Home.vue'
import City from './components/City.vue'
import PostCode from './components/PostCode.vue';

export const routes = [
	{
		path: '/',
		component: Home,
		meta: {
			homePage: true
		}
	},
	{
		path: '/city',
		component: City
	},
	{
	  path: '/post-code',
	  component: PostCode
	}
]