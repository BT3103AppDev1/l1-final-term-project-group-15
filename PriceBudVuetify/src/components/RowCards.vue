<template>
    <v-container>

    <div v-if="props.isLoggedIn" class="content-container">
        <v-sheet color="FFFFFF" elevation="4">
            
            <h1 class="title poppins-semibold">Your wishlist, at a glance</h1>
            <h3 class="desc poppins-regular">Have a look at what changed since the last time you were here</h3>

            <!-- for debugging -->
            <!-- <div>{{ wishlistActual }}</div>
            <div v-for="(product, i) in wishlistActual" :key="i"> {{ product }}</div> -->
            
            <!-- Product Cards -->
            <v-slide-group>
                <v-slide-item v-for="(product, i) in wishlistActual" :key="i">
                    <div class="card-container">
                        <ProductCard class="product-card" :productName="product" />
                        <!-- <h1>{{ product }}</h1> -->
                    </div>
                </v-slide-item>
            </v-slide-group>
            
        </v-sheet>
    </div>
        
    <div class="content-container">
    <v-sheet color="FFFFFF" elevation="4">
        <h1 class="title poppins-semibold">Largest price changes this week</h1>
        <h3 class="desc poppins-regular"> These products had  the biggest jumps/drops in price this week</h3>

        <!-- Product Cards -->
        <!-- for each insight, different data from Product object is required -->
        <v-slide-group>
            <v-slide-item v-for="(product, i) in wishlistActual" :key="i">
                <div class="card-container">
                    <ProductCard class="product-card" :productName="product" />
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
    default: () => []
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  }
})

let wishlistActual = ref([])

watch(() => props.wishlist, (newWishlist) => {
  console.log('Wishlist changed')
  console.log(newWishlist)
  wishlistActual.value = newWishlist
  console.log(wishlistActual.value)
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
    /* width: 70vw; 
    height: 20vh; */
}

.card-container {
    display: flex;
    justify-content: row;
}

/* .product-card {
    height: 20%;
    width: 20%;
} */

</style>