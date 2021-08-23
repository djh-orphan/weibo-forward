import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import Message from '../views/Message.vue'

const routes = [{
    path: '/myindex',
    name: 'Myindex',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Myindex.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/',
    redirect: '/myindex'
  },
  {
    path: '/refresh',
    redirect: '/message'
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
