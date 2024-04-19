<template>
  <v-container>
    <v-toolbar density="compact" class="custom-toolbar">
      <v-card-title>
        <template v-if="isLoggedIn">
          <h2 class="poppins-semibold">Welcome Back, {{ username }}</h2>
          <p>{{ content }}</p>
        </template>
        <template v-else>
          <h2 class="poppins-semibold">Compare prices, find sweet deals</h2>
        </template>
      </v-card-title>
      <v-spacer></v-spacer>

      <v-icon icon="mdi-trophy" />

      <v-card-subtitle v-if="isLoggedIn">{{ username }} {{ surname }}</v-card-subtitle>

      <v-menu v-if="isLoggedIn">
        <!-- activates the menu dropdown -->
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn> 
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-btn @click="redirectProfile">Profile</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = useRouter();

let username = ref('Marci'); // Replace this with the actual username from your Vuex store or API
let surname = 'Doe'; // Replace this with the actual surname from your Vuex store or API

const isLoggedIn = ref(false)
const auth = getAuth()

function redirectProfile() {
  router.push('/ProfilePage');
}

onMounted(() => {
  console.log('mounted');

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
        isLoggedIn.value = true
        username.value = user.email
    } else {
      isLoggedIn.value = false
    }
  })
  
  return unsubscribe
})

</script>

<style scoped>
.poppins-semibold {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
}

.custom-toolbar {
  font-family: 'poppins'; 
  font-weight: bold;
  background-color: white;
}
.custom-toolbar p {
  font-family: 'poppins';
  font-size: 11px; 
  font-weight: bold;
}
</style>