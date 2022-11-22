import Home from '../page/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path:'/home',
        component:Home
    }
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
  })

export default router