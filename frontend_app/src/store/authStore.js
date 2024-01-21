import {defineStore} from 'pinia';
import axios from 'axios';
import {API_ENDPOINTS} from '../config/apiConfig';


export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
    }),
    actions: {
        async login(email) {
            try {
                const response = await axios.post(API_ENDPOINTS.LOGIN, email);
                console.log(response)
                this.user = response.data.user;
                this.token = response.data.token;
                localStorage.setItem('token', this.token);
            } catch (error) {
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
