<template>
    <v-container>
    <div v-if="userEmail" class="content-container">
        <v-sheet color="FFFFFF" elevation="4">
            <h1 class="title poppins-semibold"> Your wishlist, at a glance </h1>
            <h3 class="desc poppins-regular"> Have a look at what changed since the last time you were here </h3>

            <!-- Product Cards -->
            
            <v-carousel hide-delimiters height="100%">
                <v-carousel-item v-for="(product, i) in wishlist" :key="i">
                    <div class="card-container">
                        <!-- <ProductCard :productName="product" /> -->
                        <div>{{ product }} slide</div>
                    </div>
                    
                </v-carousel-item>
            </v-carousel>

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


const props = defineProps({
    userEmail: String
})

let wishlist = []

onBeforeMount(() => {
    console.log('created')
    try {
        console.log(props.userEmail)
    } catch (error) {
        console.log('error')
    }
})

onMounted(async () => {
  const db = getFirestore()
  const docRef = doc(db, 'Users', props.userEmail)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    wishlist= docSnap.data().Wishlist
  } else {
    console.log('No such document!')
  }

  console.log('test')
  console.log(props.userEmail)
  console.log(wishlist)
})

</script>


<style scoped>
.poppins-semibold {
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
    /* height: 20vh; */
}

.card-container {
    display: flex;
    justify-content: row;
}
</style>