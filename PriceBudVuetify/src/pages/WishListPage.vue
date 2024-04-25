<template>
    <v-sheet class="page-container">

      <SideBar class="sidebar" />
  
      <v-container v-if="userEmail" class = "container">
        <HeaderComponent />
        <WishList :product = "product" :key = "product" :userEmail = "userEmail"/>

      </v-container>

      <v-container v-else class="containerr">
        <HeaderComponent />

      <h2> Please Log In/Sign Up to set you own wishlist</h2>

      </v-container>
    </v-sheet>



  </template>
  
  <script setup>
  import SideBar from '../components/SideBar.vue'
  import HeaderComponent from '../components/HeaderComponent.vue'
  import WishList from '../components/WishList.vue'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  import { ref, onMounted } from 'vue'

  const userEmail = ref("")
  const auth = getAuth()

  onMounted (() => {
    console.log('mounted');

    onAuthStateChanged(auth, (user) => {
      if (user) {
        userEmail.value = user.email
        console.log(userEmail.value)
      } else {
        console.log('No user is signed in.');
      }
    });
  });
  </script>
  
  <style>
  .home {
    display: flex;
  }
  
  .main-content {
    flex-grow: 1;
  }
  
  .container { 
    width: 80%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .page-container {
    display: flex;
    margin: auto;
    height: 100vh;
    overflow: hidden;
  }
  
  .sidebar {
    width: 20%;
  }
  
  </style>