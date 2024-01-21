import {defineStore} from 'pinia';
import axios from 'axios';
import {API_ENDPOINTS} from '../config/apiConfig';
import router from "../router/index.js";
import Swal from "sweetalert2";


export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
    }),
    getters: {
        isLoggedIn: (state) => !!state.token,
    },
    actions: {
        async login(email) {
            try {
                const response = await axios.post(API_ENDPOINTS.LOGIN, {email});

                console.log(response);

                await Swal.fire({
                    title: 'Success !',
                    text: response.data.message,
                    timer: 2000,
                    icon: "success"
                });

                console.log(response);

            } catch (error) {
                console.error(error);

                await Swal.fire({
                    title: 'Success !',
                    text: error.data.message,
                    timer: 2000,
                    icon: "success"
                });

            }

        },

        async linkLogin(loginLink) {
            try {
                const response = await axios.post(API_ENDPOINTS.LINK_LOGIN, loginLink);
                this.token = response.data.access_token;
                localStorage.setItem('token', this.token);

                await router.push('/profile');

            } catch (error) {
                console.error(error);
            }

        },
        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
            router.push('/login');
        },

        async refresh() {
            try {
                const response = await axios.get(API_ENDPOINTS.REFRESH);
                this.user = response.data.user;
                this.token = response.data.token;
                localStorage.setItem('token', this.token);


            } catch (error) {
                console.error(error);
            }
        },
        profile() {
            axios
                .get(API_ENDPOINTS.PROFILE)
                .then((response) => {
                    this.user = response.data.user;
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
});
