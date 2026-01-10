import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
       component: () => import('../views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
     {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    // 在routes数组中添加
{
  path: '/task/publish',
  name: 'task-publish',
  component: () => import('../views/TaskPublish.vue'),
  meta: { requiresAuth: true } // 需要登录
}
  ],
})

export default router
