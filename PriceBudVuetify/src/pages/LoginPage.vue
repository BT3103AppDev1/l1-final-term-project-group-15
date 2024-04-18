<template>

<h1>this is the login page</h1>
<v-btn @click="login">LOG IN</v-btn>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const login = () => {
  // Your login logic here...

  // After successful login, set isLoggedIn to true in the Vuex store
  store.commit('setLoggedIn', true);

  // And redirect to the home page
  router.push('/');
  console.log('login');
};
</script>