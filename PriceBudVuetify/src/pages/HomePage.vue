<template>
  <v-sheet class="page-container">
  <!-- for parent wrapper use vsheet as vcontainer has default margin -->
  <!-- <router-link to="/SearchResults">Search</router-link> -->
  
    <SideBar class="sidebar"/>
    
    <v-container v-if="isLoggedIn" class="right-container">
      <HeaderComponent />
      <SearchBar />
      <MasterInput v-if="userEmail == 'master@gmail.com'" />
      <UserPriceInput />
      <RowCards :userEmail = "userEmail"/>
                
    </v-container>

    <v-container v-else class="right-container">
      <HeaderComponent />
      <SearchBar />
      <HomeLoginComp />
      <RowCards :isWishlist="false"
                title="Largest price changes this week"
                description="These products had the biggest price changes this week"
                />
      
    </v-container>

  </v-sheet>
</template>

<script setup>
import SearchBar from '../components/SearchBar.vue'
import RowCards from '../components/RowCards.vue'
import SideBar from '../components/SideBar.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import HomeLoginComp from '../components/HomeLoginComp.vue'
import MasterInput from '../components/MasterInput.vue'
import UserPriceInput from '../components/UserPriceInput.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'
import { ref, onMounted } from 'vue'


const userEmail = ref("")

const isLoggedIn = ref(false)
const auth = getAuth()
    

onMounted(() => {
  console.log('mounted');

  function isNewUser(user) {
    return user.metadata.creationTime === user.metadata.lastSignInTime;
  }

  const newUserUpdate = onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
      const isFirstTimeLogin = isNewUser(user);

      if (isFirstTimeLogin) {
        console.log("First time login!");

        const db = getFirestore()
        const userCollection = collection(db, 'Users')
        const customDocumentId = user.email
        const userDocumentRef = doc(userCollection, customDocumentId)
        const userData = {
          Wishlist: [],
          Name: user.displayName,
        }

        try {
          setDoc(userDocumentRef, userData)
            .then(() => {
              console.log('Document written with custom ID: ', customDocumentId)
            })
            .catch(error => {
              console.error('Error adding user document: ', error)
            })
        } catch (error) {
          console.error('Error adding document: ', error)
        }
      } else {
        console.log("Returning user");
      }
    } else {
      isLoggedIn.value = false
    }

    console.log(user)
    console.log(user.email)
    userEmail.value = user.email
  })

  return newUserUpdate;
})
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
