import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Bank from '../views/Bank.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'

const routes: Array<RouteRecordRaw> = [
	{ path: '/', name: 'Home', component: Home },
	{ path: '/bank', name: 'Bank', component: Bank },
	{ path: '/profile', name: 'Profile', component: Profile }
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
