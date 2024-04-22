<template>
    <div class="page-container">
  
      <div class="sidebar">
        <SideBar />
      </div>
  
      <div class = "container">
        <HeaderComponent />
        <WishList :product = "product" :key = "product" :userEmail = "userEmail"/>

      </div>
    </div>



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
    flex: 8;
    display: flex;
    flex-direction: column;
  }

  .page-container {
    display: flex;
    flex: 8;
    margin: 0;
  }
  
  .sidebar {
    flex: 2;
  }
  
  </style>