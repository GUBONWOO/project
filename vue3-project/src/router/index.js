import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/index.vue'
import Todos from '../pages/todos/index.vue'
import Todo from '../pages/todos/_id.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/todos',
      name: 'Todos',
      component: Todos
    },
    {
      path: '/todos/:id',
      name: 'Todo',
      component: Todo
    }
  ]
})

export default router
