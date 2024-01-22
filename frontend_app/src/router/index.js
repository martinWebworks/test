// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';
import Activate from '../views/Activate.vue';
import { useAuthStore } from '../store/authStore';

const routes = [
    {
        path: "/login",
        component: Login
    },
    {
        path: "/link-login",
        component: Activate,
    },
    {
        path: "/profile",
        component: Profile,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    // Exclude the link-login route from redirection logic
    if (to.path !== '/link-login' && to.matched.some(record => record.meta.requiresAuth) && !authStore.isLoggedIn) {
        next({ path: '/login' });
    } else {
        next();
    }
});

export default router;
