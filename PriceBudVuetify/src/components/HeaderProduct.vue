<template>
    <v-container v-if="isLoggedIn"> 
      <v-toolbar density="compact" class="custom-toolbar">
        <v-card-title>
            <h2 class="poppins-semibold"> Welcome Back, {{ username }} </h2>
            <p>{{ content }}</p>

        </v-card-title>
        <v-spacer></v-spacer>
  
        <v-icon icon="mdi-trophy" />
  
        <v-card-subtitle>{{ username }} </v-card-subtitle>
  
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

    <v-container v-else>
        <v-toolbar density="compact" class="custom-toolbar">
    <h2 class="poppins-semibold"> Sign in to unlock full potential </h2>
    <v-spacer></v-spacer>

    <div>
        <v-btn @click="redirectLogIn"> Sign in</v-btn>
    </div>
    </v-toolbar>
</v-container>

  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  
  const router = useRouter();
  
  let username = ref(); // Replace this with the actual name from firebase
  
  
  const isLoggedIn = ref(false)
  const auth = getAuth()
  
  function redirectLogIn() {
    router.push('/LogIn1');
  }
  
  onMounted(() => {
    console.log('mounted');
  
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
          isLoggedIn.value = true
          username.value = user.displayName
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