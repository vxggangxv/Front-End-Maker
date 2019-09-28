import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/trending',
      name: 'trending',
      component: () => import('@/views/trending.vue')
    }, {
      path: '/post',
      name: 'post',
      component: () => import('@/views/post.vue')
    }, {
      path: '/tag',
      name: 'tag',
      component: () => import('@/views/tag.vue')
    }, {
      path: '/user',
      name: 'user',
      component: () => import('@/views/user.vue')
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import('@/views/sign.vue')
    },
    {
      path: '/passwordReset',
      name: 'passwordReset',
      component: () => import('@/views/passwordReset.vue')
    },
    {
      path: '/lectures',
      component: () => import('@/views/lectures/index.vue'),
      children: [{
          path: 'notes',
          name: 'notes',
          component: () => import('@/views/lectures/notes.vue')
        },
        {
          path: 'storage',
          name: 'storage',
          component: () => import('@/views/lectures/storage.vue')
        },
      ]
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
