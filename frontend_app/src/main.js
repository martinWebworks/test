import {createApp} from 'vue'
import {createWebHistory, createRouter} from "vue-router";
import { createPinia } from 'pinia'


import './style.css'
import App from './App.vue'

const pinia = createPinia()



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


createApp(App).use(router).use(pinia).mount('#app')
