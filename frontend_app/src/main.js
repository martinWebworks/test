import {createApp} from 'vue'
import {createWebHistory, createRouter} from "vue-router";

import './style.css'
import App from './App.vue'


import Login from './views/Login.vue'
import Profile from './views/Profile.vue'


const routes = [
    {
        path: "/login",
        component: Login,
    },

    {
        path: "/profile",
        component: Profile,
    },
    {path: "/:pathMatch(.*)*", redirect: "/login"},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


createApp(App).use(router).mount('#app')
