import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import homeIndex from './views/home/index.vue';
import homeMain from './views/home/main.vue';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			redirect: '/home/main',
		},
		{
			path: '/home',
			redirect: '/home/main',
			component: homeIndex,
			children: [
				{
					path: 'main',
					name: 'main',
					component: homeMain,
				},
				{
					path: 'mainList',
					name: 'mainList',
					component: () => import('@/views/home/mainList.vue'),
				},
				{
					path: 'trending',
					name: 'trending',
					component: () => import('@/views/home/trending.vue'),
				},
				{
					path: 'post',
					name: 'post',
					component: () => import('@/views/home/post.vue'),
				},
				{
					path: 'tag',
					name: 'tag',
					component: () => import('@/views/home/tag.vue'),
				},
				{
					path: 'user',
					name: 'user',
					component: () => import('@/views/home/user.vue'),
				},
			],
		},
		{
			path: '/sign',
			name: 'sign',
			component: () => import('@/views/sign.vue'),
		},
		{
			path: '/board',
			component: () => import('@/views/board/index.vue'),
			children: [
				{
					path: 'write',
					name: 'write',
					component: () => import('@/views/board/write.vue'),
				},
				{
					path: 'list',
					name: 'list',
					component: () => import('@/views/board/list.vue'),
				},
				{
					path: 'list/:id',
					component: () => import('@/views/board/listItem.vue'),
				},
				{
					path: 'edit/:id',
					component: () => import('@/views/board/edit.vue'),
				},
			],
		},
		{
			path: '/lectures',
			component: () => import('@/views/lectures/index.vue'),
			children: [
				{
					path: 'notes',
					name: 'notes',
					component: () => import('@/views/lectures/notes.vue'),
				},
				{
					path: 'storage',
					name: 'storage',
					component: () => import('@/views/lectures/storage.vue'),
				},
				{
					path: 'axios',
					name: 'axios',
					component: () => import('@/views/lectures/axios.vue'),
				},
			],
		},
		{
			path: '*',
			name: 'e404',
			component: () => import('./views/e404.vue'),
		},
	],
});

const waitFirebase = () => {
	return new Promise((resolve, reject) => {
		let cnt = 0;
		const tmr = setInterval(() => {
			if (store.state.firebaseLoaded) {
				clearInterval(tmr);
				resolve();
			} else if (cnt++ > 500)
				reject(Error('제한 시간 초과, 인터넷 연결을 확인하세요'));
		}, 10);
	});
};

router.beforeEach((to, from, next) => {
	Vue.prototype.$Progress.start();
	// if (store.state.firebaseLoaded) {
	//   next()
	// } else next()
	waitFirebase()
		.then(() => next())
		.catch(e => Vue.prototype.$toasted.global.error(e.message));
});

router.afterEach((to, from) => {
	Vue.prototype.$Progress.finish();
});

router.onError(e => {
	Vue.prototype.$Progress.finish();
	// Vue.prototype.$toasted.global.error(e.message)
});

export default router;
