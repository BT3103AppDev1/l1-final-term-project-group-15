<template>
    <v-container>

    <div v-if="props.isLoggedIn" class="content-container">
        <v-sheet color="FFFFFF" elevation="4">
            
            <h3 class="title poppins-semibold">Your wishlist, at a glance</h3>
            <p class="desc poppins-regular">Have a look at what changed since the last time you were here</p>

            <!-- for debugging -->
            <!-- <div>{{ wishlistActual }}</div>
            <div v-for="(product, i) in wishlistActual" :key="i"> {{ product }}</div> -->
            
            <!-- Product Cards -->

            <v-slide-group v-if="wishlistActual.length != 0">
                <v-slide-item v-for="(product, i) in wishlistActual" :key="i">
                    <div class="card-container">
                        <ProductCard class="product-card" :productName="product" :wishlistedPrice="wishlistedPrices[i]" />
                        <!-- <h1>{{ product }}</h1> -->
                    </div>
                </v-slide-item>
            </v-slide-group>

            <div v-else>
                <h2 class="poppins-semibold center-div">Your wishlist is empty</h2>
                <!-- <h3 class="poppins-regular">Add products to your wishlist to see them here</h3> -->
            </div>
            
        </v-sheet>
    </div>
        
    <div class="content-container">
    <v-sheet color="FFFFFF" elevation="4">
        <h3 class="title poppins-semibold">Largest price changes this week</h3>
        <p class="desc poppins-regular"> These products had  the biggest jumps/drops in price this week</p>

        <!-- Product Cards -->
        <!-- for each insight, different data from Product object is required -->
        <v-slide-group>
            <v-slide-item v-for="(product, i) in wishlistActual" :key="i">
                <div class="card-container">
                    <ProductCard class="product-card" :productName="product" :wishlistedPrice="wishlistedPrices[i]" />
                    <!-- <h1>{{ product }}</h1> -->
                </div>
            </v-slide-item>
        </v-slide-group>
            
    </v-sheet>
    </div>  
    </v-container>  
</template>


<script setup>
import { defineProps, watch, onMounted, ref } from 'vue'
import ProductCard from './ProductCard.vue'

const props = defineProps({
  wishlist: {
    type: Array,
    default: () => {}
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  }
})

// make wishlist dynamic on wishlisting (add date since wishlisted)


let wishlistActual = ref([])
let wishlistedPrices = ref([])

watch(() => props.wishlist, (newWishlist) => {
  console.log('Wishlist changed')
  console.log(newWishlist)
  wishlistActual.value = Object.keys(newWishlist)
  wishlistedPrices.value = Object.values(newWishlist)

  console.log(wishlistActual.value)
  console.log(wishlistedPrices.value)
})

onMounted(() => {
  console.log('Mounted')
  console.log(props.wishlist)
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
    margin-bottom: 4%;
}

.card-container {
    display: flex;
    justify-content: row;
}

.center-div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10%;
}

/* .product-card {
    height: 20%;
    width: 20%;
} */

</style>