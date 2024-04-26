<template>
  <v-sheet class="page-container">
  
    <SideBar class="sidebar" />
  
    <v-container v-if="userEmail" class="right-container">
      <HeaderComponent style="padding-bottom: 0px;"/>
      <p style="padding-left: 16px; padding-bottom: 16px">See what others are reviewing about!</p>
      <CommunityCard />

    </v-container>

    <v-container v-else class="right-container">
      <HeaderComponent />

     <h2> Please Log In/Sign Up to create your first post!</h2>

    </v-container>

  </v-sheet>
</template>

    
<script>
import SideBar from '../components/SideBar.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import CommunityCard from '../components/CommunityCard.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  data() {
      return {
        product: null,
        auth: null,
        userEmail: null
      }
    },
  components: {
      SideBar,
      HeaderComponent,
      CommunityCard,
  },    
  mounted() {

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
  width: 20%; /* Adjust this value based on your needs */
  height: 100vh;
  overflow-y: auto;
}

.right-container {
  flex: 8;
  display: flex;
  flex-direction: column;
  font-family: 'Poppins';
  overflow-y: auto;
}

p {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: rgb(91, 104, 134);
}
</style>