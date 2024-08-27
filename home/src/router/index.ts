import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('../views/home/Home.vue')
    },
    {
        path: '/about',
        component: () => import('../views/about/About.vue')
    },
    {
        path: '/chat',
        component: () => import('../views/inbox/Inbox.vue')
    },
    {
        path: '/news',
        component: () => import('../views/news/News.vue')
    },
    {
        path: '/projects',
        component: () => import('../views/favs/Favs.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
