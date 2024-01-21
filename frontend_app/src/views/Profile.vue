<template>
  <navbar-component></navbar-component>
  <main>
    <div class="dark:bg-gray-700 bg-gray-200 pt-12 pb-24">

      <div class="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <div class="border-b px-4 pb-6">
          <div class="text-center my-4">
            <img class="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                 :src="userProfile" alt="">
            <div class="py-2">
              <h3 class="font-bold text-2xl text-gray-800 dark:text-white mb-1">No Name</h3>
              <p>email@test.com</p>
              <div class="inline-flex text-gray-700 dark:text-gray-300 items-center">
                <svg class="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path class=""
                        d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                </svg>
                Kenya, Africa
              </div>
            </div>
            <div class="mt-2 mb-2">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <div class="flex gap-2 px-2 mt-4">
            <button
                class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
              Logout
            </button>
            <button
                class="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
              Refresh Token
            </button>
          </div>
        </div>
      </div>

    </div>

  </main>
  <footer-component></footer-component>

</template>
<script>
import NavbarComponent from "../components/Navbar.vue";
import FooterComponent from "../components/Footer.vue";


import userprofile from '../assets/img/default.webp'

export default {
  name: "profile",
  components: {
    NavbarComponent,
    FooterComponent
  },

  data() {
    return {
      userProfile: userprofile
    };
  },
}
</script>