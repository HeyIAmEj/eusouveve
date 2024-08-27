import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import ('../views/home/Home.vue')
    },
    {
        path: '/inbox',
        component: () => import ('../views/inbox/Inbox.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
