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
      <RowCards :wishlist = "wishlist" :isLoggedIn="true" />

      <!-- for testing if the top5ReviewedProductsActual is being fetched from the database -->
      <!-- <h1>{{ top5ReviewedProductsActual }}</h1> -->
                
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
import { getFirestore, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { ref,  onBeforeMount } from 'vue'


const userEmail = ref("")

const isLoggedIn = ref(false)
const auth = getAuth()

let wishlist = ref({})

// onBeforeMount(() => {
//   console.log('created')
// })

onBeforeMount(() => {
  console.log('created');

  function isNewUser(user) {
    return user.metadata.creationTime === user.metadata.lastSignInTime;
  }

  // async function getTop5ReviewedProducts() {
  //   const db = getFirestore();
  //   const querySnapshot = await getDocs(collection(db, 'Products'));
  //   let top5ReviewedProducts = [];x

  //   querySnapshot.forEach((doc) => {
  //     const product = doc.data();
  //     product.id = doc.id; // Include the document ID in the product data
  //     const entry = {
  //       id: product.id,
  //       Ratings: product.Ratings
  //     }
  //     top5ReviewedProducts.push(entry);
  //   });

  //   top5ReviewedProducts = top5ReviewedProducts
  //     .sort((a, b) => b.Ratings - a.Ratings)
  //     .slice(0, 5);

  //   console.log(top5ReviewedProducts)
  //   top5ReviewedProductsActual = top5ReviewedProducts
  //   console.log(top5ReviewedProductsActual)
  // }

  // async function getTop5WishlistedProducts() {
  //   const db = getFirestore();
  //   const querySnapshot = await getDocs(collection(db, 'Products'));
  //   let top5WishlistedProducts = [];

  //   querySnapshot.forEach((doc) => {
  //     const product = doc.data();
  //     product.id = doc.id; // Include the document ID in the product data
  //     const entry = {
  //       id: product.id,
  //       NumWishlisted: product["Number Of Wishlists"]
  //     }
  //     top5WishlistedProducts.push(entry);
  //   });

  //   top5WishlistedProducts = top5WishlistedProducts
  //     .sort((a, b) => b.NumWishlisted - a.NumWishlisted)
  //     .slice(0, 5);

  //   console.log(top5WishlistedProducts)
  //   top5ReviewedProductsActual = top5WishlistedProducts
  //   console.log(top5ReviewedProductsActual)
  // }



  const newUserUpdate = onAuthStateChanged(auth, async (user) => {
    if (user) {
      isLoggedIn.value = true
      const isFirstTimeLogin = isNewUser(user);

      if (isFirstTimeLogin) {
        console.log("First time login!");
        // getTop5ReviewedProducts()
        // getTop5WishlistedProducts()

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
      } else {
        console.log("Returning user");
        console.log(user)
        console.log(user.email)

        userEmail.value = user.email
        
        const db = getFirestore()
        const docRefUser = doc(db, 'Users', user.email)
        const docSnapUser = await getDoc(docRefUser)

        if (docSnapUser.exists()) {
          const data = docSnapUser.data()
          console.log(data.Wishlist)
          wishlist.value = data.Wishlist
        }
        console.log(wishlist.value)
        // getTop5ReviewedProducts()
        // getTop5WishlistedProducts()
      }
    } else {
      isLoggedIn.value = false
      // getTop5ReviewedProducts()
      // getTop5WishlistedProducts()
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
