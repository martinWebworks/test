<template>
  <div>
    <navbar-component></navbar-component>


    <main class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
        <a href="/" class="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
          <img :src="logo" class="mr-4 h-11" alt="WebPortal Logo">
          <span>WebPortal</span>
        </a>
        <!-- Card -->
        <div class="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Sign in to platform
          </h2>
          <form class="mt-8 space-y-6" @submit.prevent="login">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" v-model="email"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="email@test.com" required>

            </div>
            <div v-if="v$.email.$error" class="text-red-600">
              <span v-if="!v$.email.required">Email is required.</span>
              <span v-if="!v$.email.email">Please enter a valid email.</span>
            </div>

            <button type="submit"
                    class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Get Login Link
            </button>


          </form>
        </div>
      </div>

    </main>
  </div>
</template>
<script>
import NavbarComponent from "../components/Navbar.vue";
import FooterComponent from "../components/Footer.vue";


import logoImg from '../assets/img/logo.svg'
import {useAuthStore} from "../store/authStore";
import {ref} from "vue";
import {useVuelidate} from '@vuelidate/core'
import {required, email} from '@vuelidate/validators'


export default {


  setup() {


    const authStore = useAuthStore();

    const email = ref('');

    const rules = {
      email: {required, email},
    };

    const v$ = useVuelidate(rules, {email});


    const login = async () => {
      v$.value.$touch();
      if (!v$.value.$invalid) {
        try {
          await authStore.login(email.value);

        } catch (error) {
          console.error(error);
        }
      }
    };


    return {
      email,
      login,
      v$,
    };


  },

  validations() {
    return {
      email: {required, email}
    }
  },

  name: "login-page",
  components: {
    NavbarComponent,
    FooterComponent
  },
  data() {
    return {
      logo: logoImg
    };
  },
}
</script>