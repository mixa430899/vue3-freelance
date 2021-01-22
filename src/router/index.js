import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '../views/Tasks.vue'
import Task from '../views/Task.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', name: 'Home', component: Tasks },
  // можно и с props: true
  { path: '/task/:id', name: 'Task', component: Task },
  // lazy loading страницы new, просто для примера
  {
    path: '/new',
    name: 'New',
    component: () => import(/* webpackChunkName: "newtask" */ '../views/New.vue')
  },
  // 404, можно с редиректом при желании, сделал без него
  { 
    path: '/:notFound(.*)', 
    // redirect: '/'
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
