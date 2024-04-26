<template>
    <div class="page-container">
  
      <div class="sidebar">
        <SideBar />
      </div>
  
      <v-container v-if="userEmail" class = "container">
        <HeaderComponent />
        <ProfileHeader :userEmail = "userEmail" :userName = "userName"/>

      </v-container>

      <v-container v-else class="container">
        <HeaderComponent />

      <h2> Please Log In/Sign Up to see your profile!</h2>

      </v-container>

    </div>



  </template>

    
<script>
import SideBar from '../components/SideBar.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import ProfileHeader from '../components/ProfileHeader.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
export default {
  data() {
      return {
        auth: null,
        userEmail: null,
        userName: null
      }
    },
    mounted() {
      this.product = this.$route.params.id

      this.auth = getAuth()
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.userEmail = user.email
          this.userName = user.displayName
          console.log(this.userEmail)
          console.log('test')
        } 
      })
    },
  components: {
      SideBar,
      HeaderComponent,
      ProfileHeader,
  }
}


</script>

<style scoped>
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
    font-family:'Poppins';
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