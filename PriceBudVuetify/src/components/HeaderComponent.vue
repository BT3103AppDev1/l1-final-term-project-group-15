<template>

  <!-- View for logged in users -->
  <v-container v-if="isLoggedIn">
    <v-toolbar density="compact" id="custom-toolbar">
      <h2 class="title">Welcome Back, {{ username }}</h2>
      <p>{{ content }}</p>

      <v-spacer></v-spacer>

      <v-card-subtitle> {{ username }} </v-card-subtitle>

      <v-menu>
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

  <!-- View for logged out users -->
  <v-container v-else>
   <h2 class="poppins-semibold">Compare prices, find sweet deals</h2>
  </v-container>


</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = useRouter();
let username = ref(); 
const isLoggedIn = ref(false)
const auth = getAuth()

// For profile page redirecting
function redirectProfile() {
  router.push('/ProfilePage');
}


onMounted(() => {
  // Check if user is logged in
  const checkUser = onAuthStateChanged(auth, (user) => {
    if (user) {
        isLoggedIn.value = true
        username.value = user.displayName
    } else {
      isLoggedIn.value = false
    }
  })
  return checkUser
})
</script>

<style>
.title {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 28px;
    background-color: white;
}

#custom-toolbar  {
  font-family: 'poppins';
  font-size: 11px; 
  font-weight: bold;
  background-color: white;
}
</style>