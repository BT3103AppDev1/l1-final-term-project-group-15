<template>
  <v-sheet class="page-container">  
    <SideBar class="sidebar"/>
    
    <v-container v-if="isLoggedIn" class="right-container">
      <HeaderComponent />
      <SearchBar />
      <MasterInput v-if="userEmail == 'master@gmail.com'" />
      <UserPriceInput />
      <RowCards :wishlist = "wishlist" :isLoggedIn="true" />
    </v-container>

    <v-container v-else class="right-container">
      <HeaderComponent />
      <SearchBar />
      <HomeLoginComp />
      <RowCards :isLoggedIn="false"/>
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
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { ref,  onBeforeMount } from 'vue'


const userEmail = ref("")
const isLoggedIn = ref(false)
const auth = getAuth()
let wishlist = ref({})

onBeforeMount(() => {
  // Method to check if user is new
  function isNewUser(user) {
    return user.metadata.creationTime === user.metadata.lastSignInTime;
  }

  // Method to update firestore and create a new User document for new users and other functionalities
  const newUserUpdate = onAuthStateChanged(auth, async (user) => {
    console.log(user)
    if (user) {
      isLoggedIn.value = true
      const isFirstTimeLogin = isNewUser(user);

      // Creation of new document for new users
      if (isFirstTimeLogin) {
        const db = getFirestore()
        const userCollection = collection(db, 'Users')
        const customDocumentId = user.email
        const userDocumentRef = doc(userCollection, customDocumentId)
        const userData = {
          Wishlist: {},
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
      
      // Fetching user's wishlist for existing users
      } else {
        userEmail.value = user.email
        const db = getFirestore()
        const docRef = doc(db, 'Users', user.email)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          console.log(data.Wishlist)
          wishlist.value = data.Wishlist
        }
      }
    } else {
      isLoggedIn.value = false
    }
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
