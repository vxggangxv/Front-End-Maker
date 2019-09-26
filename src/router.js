import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import homeIndex from './views/home/index.vue'
import homeMain from './views/home/main.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: homeIndex,
      children: [
        {
          path: 'home',
          name: 'home',
          component: homeMain,
        },
        {
          path: 'trending',
          name: 'trending',
          component: () => import('@/views/home/trending.vue')
        },
        {
          path: 'post',
          name: 'post',
          component: () => import('@/views/home/post.vue')
        },
        {
          path: 'tag',
          name: 'tag',
          component: () => import('@/views/home/tag.vue')
        },
        {
          path: 'userProfile',
          name: 'userProfile',
          component: () => import('@/views/home/userProfile.vue')
        },
      ]
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import('@/views/sign.vue')
    },
    {
      path: '*',
      name: 'e404',
      component: () => import('./views/e404.vue')
    }
  ]
})

const waitFirebase = () => {
  return new Promise((resolve, reject) => {
    let cnt = 0
    const tmr = setInterval(() => {
      if (store.state.firebaseLoaded) {
        clearInterval(tmr)
        resolve()
      } else if (cnt++ > 500) reject(Error('제한 시간 초과, 인터넷 연결을 확인하세요'))
    }, 10)
  })
}

router.beforeEach((to, from, next) => {
  Vue.prototype.$Progress.start()
  // if (store.state.firebaseLoaded) {
  //   next()
  // } else next()
  waitFirebase()
    .then(() => next())
    .catch(e => Vue.prototype.$toasted.global.error(e.message))
})

router.afterEach((to, from) => {
  Vue.prototype.$Progress.finish()
})

router.onError(e => {
  Vue.prototype.$Progress.finish()
  // Vue.prototype.$toasted.global.error(e.message)
})

export default router