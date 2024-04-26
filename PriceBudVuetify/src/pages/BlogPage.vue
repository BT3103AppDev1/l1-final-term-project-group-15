<template>
   <v-sheet class="page-container">

    <SideBar class="sidebar" />

    <v-container v-if="userEmail" class="right-container">
      <HeaderComponent />
      <BlogComp :blogId = "blogId"/>
    </v-container>

    </v-sheet>
  </template>
  
  <script>
  import SideBar from '../components/SideBar.vue'
  import HeaderComponent from '../components/HeaderComponent.vue'
  import BlogComp from '../components/BlogComp.vue'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  
  export default {
    data() {
        return {
          auth: null,
          userEmail: null,
          blogId: null
        }
      },
    components: {
        SideBar,
        HeaderComponent,
        BlogComp,
    },    
    mounted() {
      this.blogId = this.$route.params.id
   
  
      this.auth = getAuth()
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.userEmail = user.email
          console.log(this.userEmail)
          console.log('test')
        } 
      })
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
    width: 20%; 
    height: 100vh;
    overflow-y: auto;
  }
  
  .right-container {
    width: 80%; 
    overflow-y: auto;
    height: 100vh;
  }
  
  </style>
  