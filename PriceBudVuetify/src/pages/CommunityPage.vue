<template>
  <v-sheet class="page-container">
  
    <SideBar class="sidebar" />
  
    <v-container v-if="userEmail" class="right-container">
      <HeaderComponent />
      <CommunityCard />

    </v-container>

    <v-container v-else class="right-container">
      <HeaderComponent />

     <h2> Please LogIn/Sign Up to create your first post!</h2>

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
    this.product = this.$route.params.id

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
  width: 80%; /* Adjust this value based on your needs */
  overflow-y: auto;
  height: 100vh;
}
</style>