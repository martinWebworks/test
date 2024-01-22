import {defineStore} from 'pinia';
import axios from 'axios';
import {API_ENDPOINTS as PI_ENDPOINTS, API_ENDPOINTS} from '../config/apiConfig';
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
                const response = await axios.post(API_ENDPOINTS.LOGIN, {email: email}, {
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                console.log(response)
                await Swal.fire({
                    title: 'Success !',
                    text: response.data.message,
                    timer: 2000,
                    icon: "success"
                });

            } catch (error) {
                await Swal.fire({
                    title: 'Success !',
                    text: error.response.data.error,
                    timer: 2000,
                    icon: "error"
                });

            }

        },

        async linkLogin(loginLink) {
            try {
                const loginUrl = `${PI_ENDPOINTS.LINK_LOGIN}?token=${loginLink}`;

                const response = await axios.get(loginUrl);
                this.token = response.data.access_token;
                localStorage.setItem('token', this.token);

                await router.push('/profile');

            } catch (error) {
                console.error(error.response);

                await Swal.fire({
                    title: 'Error !',
                    text: error.response.data.error,
                    timer: 2000,
                    icon: "error"
                });

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
