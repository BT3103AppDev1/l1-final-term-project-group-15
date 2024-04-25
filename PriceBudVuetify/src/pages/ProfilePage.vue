<template>
    <div class="page-container">
  
      <div class="sidebar">
        <SideBar />
      </div>
  
      <div class = "container">
        <HeaderComponent />
        <ProfileHeader :userEmail = "userEmail" :userName = "userName"/>

      </div>
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