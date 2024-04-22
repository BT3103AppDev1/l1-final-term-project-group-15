<template>
    <v-container>
    <div v-if="userEmail" class="content-container">
        <v-sheet color="FFFFFF" elevation="4">

        <button @click="print">Print</button>
            
  <v-carousel
    height="400"
    show-arrows="hover"
    cycle
    hide-delimiter-background
  >
    <v-carousel-item
      v-for="(slide, i) in wishlist"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">
            {{ slide }} Slide
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
            <!-- <h1 class="title poppins-semibold">{{ title }}</h1>
            <h3 class="desc poppins-regular">{{ description }}</h3> -->

            <!-- Product Cards -->
            <!-- <v-carousel hide-delimiters height="100%">
                <v-carousel-item v-for="(product, i) in products" :key="i">
                    <div class="card-container">
                        <!-- <ProductCard :productName="product" /> -->
                        <div>{{ product }} slide</div>
                    </div>
                    
                </v-carousel-item>
            </v-carousel> -->

            <!-- <v-container> 
                <ProductCard :productName="wishlist.value[0]" />
            </v-container> -->


        </v-sheet>
    </div>
    <div class="content-container">
        <v-sheet color="FFFFFF" elevation="4">
            <h1 class="title poppins-semibold">Largest price changes this week</h1>
            <h3 class="desc poppins-regular">These products had the biggest price changes this week</h3>

            <!-- Product Cards -->
            <!-- for each insight, different data from Product object is required -->
            <v-carousel hide-delimiters height="100%">
                <v-carousel-item v-for="(product, i) in products" :key="i">
                    <div class="test">
                        <ProductCard :wishlist="product" />
                        <ProductCard :wishlist="product" />
                        <ProductCard :wishlist="product" />
                        <ProductCard :wishlist="product" />
                    </div>
                    
                </v-carousel-item>
            </v-carousel>
       
        </v-sheet>
    </div>
    </v-container>
</template>


<script setup>
import { defineProps, onMounted, onBeforeMount } from 'vue'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import ProductCard from './ProductCard.vue'


const colors = [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ]

const slides =  ['First', 'Second', 'Third', 'Fourth', 'Fifth']

let wishlist = []

function print() {
    console.log(wishlist)
}

const props = defineProps({
    userEmail: String
})

async function fetchUserWishlist(userEmail) {
    try {
        const db = getFirestore()
        console.log(userEmail)
        const userDocRef = doc(db, "Users", userEmail)
        const userDocSnap = await getDoc(userDocRef)
        if (userDocSnap.exists()) {
            console.log('Document data:', userDocSnap.data())
            wishlist = userDocSnap.data().Wishlist
            console.log(wishlist)
        } else {
            console.log('No such document / user')
        }
    } catch (error) {
        console.error('Error fetching user', error)
    }
}

onMounted(() => {
    console.log(props.userEmail)
    fetchUserWishlist(props.userEmail)
 })
</script>


<style scoped>
/* .poppins-semibold {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
}

.poppins-regular {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
}

.v-sheet {
    padding: 2%;
}

.content-container {
    /* width: 70vw; */
    /* height: 20vh; 
}*/

/* .card-container {
    display: flex;
    justify-content: row;
} */ 
</style>