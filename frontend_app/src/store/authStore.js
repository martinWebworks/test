// store/auth.js
import {defineStore} from 'pinia';
import axios from 'axios';
import {API_ENDPOINTS} from '../config/apiConfig';


export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
    }),
    actions: {
        async login(credentials) {
            try {
                const response = await axios.post(API_ENDPOINTS.LOGIN, credentials);
                this.user = response.data.user;
                this.token = response.data.token;
                // You might want to store the token in localStorage
                localStorage.setItem('token', this.token);
            } catch (error) {
                // Handle error (invalid credentials, etc.)
                console.error(error);
            }
        },
        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
        },
    }
});
