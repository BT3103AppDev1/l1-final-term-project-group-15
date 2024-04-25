<template>
    <v-sheet class="page-container">
 
     <SideBar class="sidebar" />
 
     <v-container class="right-container">
       <HeaderComponent />
       <HelpComp />
     </v-container>
 
     </v-sheet>
   </template>
   
   <script>
   import SideBar from '../components/SideBar.vue'
   import HeaderComponent from '../components/HeaderComponent.vue'
   import HelpComp from '../components/HelpComp.vue'
   
   export default {
     components: {
         SideBar,
         HeaderComponent,
         HelpComp,
     },    
   }
   </script>
   
   <style scoped>
   .page-container {
     display: flex;
     height: 100vh;
     overflow: hidden;
     margin: auto;
   }
   
   .sidebar {
     width: 20%; /* Adjust this value based on your needs */
     height: 100vh;
     overflow-y: auto;
   }
   
   .right-container {
     width: 80%; /* Adjust this value based on your needs */
     overflow-y: auto;
     height: 100vh;
   }
   
   </style>
   