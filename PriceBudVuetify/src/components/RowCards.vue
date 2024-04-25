<template>
    <v-container>

    <div v-if="props.isLoggedIn" class="content-container">
        <v-sheet color="FFFFFF" elevation="3" :style="{ 'border-radius': '12px' }">
            
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
    <v-sheet color="FFFFFF" elevation="3" :style="{ 'border-radius': '12px' }">
        <div class="titles-and-button">
            <div v-if="toggleOn">
                <h3 class="title poppins-semibold">Products that are the most highly rated</h3>
                <p class="desc poppins-regular"> These products are the most widely praised</p>
            </div>
            <div v-else>
                <h3 class="title poppins-semibold">Most wanted products, according to you</h3>
                <p class="desc poppins-regular">These products have the most people adding to them to their Wishlist</p>
            </div>
            <div>
                <v-menu transition="slide-y-transition">
                    <template v-slot:activator="{ props }">
                        <v-btn color="primary" v-bind="props" class="poppins-semibold">
                        Toggle
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="showInsight1()">
                        <v-list-item-title>Most highly rated</v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="showInsight2()">
                        <v-list-item-title>Most wishlisted</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </div>
        <!-- Product Cards -->
        <!-- for each insight, different data from Product object is required -->
        <v-slide-group v-if="toggleOn">
            <v-slide-item v-for="(product, i) in wishlistActual" :key="i">
                <div class="card-container">
                    <ProductCard class="product-card" :productName="product" :wishlistedPrice="wishlistedPrices[i]" />                    <!-- <h1>{{ product }}</h1> -->
                </div>
            </v-slide-item>
        </v-slide-group>

        <v-slide-group v-else>
            <v-slide-item v-for="(itemNumber, i) in itemNumberArr" :key="i">
                <div class="card-container">
                    <ProductCard class="product-card" :productName="product" :wishlistedPrice="wishlistedPrices[i]" />                    <!-- <h1>{{ product }}</h1> -->
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

const itemNumberArr = [0, 1, 2, 3, 4]

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

let toggleOn = ref(false)

function showInsight1() {
    console.log('showing review insight')
    toggleOn.value = true
}

function showInsight2() {
    console.log('showing wishlist insight')
    toggleOn.value = false
}

// make wishlist dynamic on wishlisting (add date since wishlisted)


let wishlistActual = ref([])
let wishlistedPrices = ref([])

// let top5ReviewedProductsActual = ref([])
// let top5ReviewedProductsNumbers = ref([])

// let top5WishlistedProductsActual = ref([])
// let top5WishlistedProductsNumbers = ref([])

watch(() => props.wishlist, (newWishlist) => {
  console.log('Wishlist changed')
  console.log(newWishlist)
  wishlistActual.value = Object.keys(newWishlist)
  wishlistedPrices.value = Object.values(newWishlist)

  console.log(wishlistActual.value)
  console.log(wishlistedPrices.value)
})

// watch(() => props.top5RevProd, (newTop5RevProd) => {
//     console.log('Top 5 reviewed products changed')
//     console.log(newTop5RevProd)
//     Object.keys(newTop5RevProd).forEach(key => {
//         const product = newTop5RevProd[key];
//         top5ReviewedProductsActual.value.push(product.id);
//     });
//     Object.keys(newTop5RevProd).forEach(key => {
//         const product = newTop5RevProd[key];
//         top5ReviewedProductsNumbers.value.push(product["Ratings"]);
//     });

//   console.log(top5ReviewedProductsActual.value)
//   console.log(top5ReviewedProductsNumbers.value)
// })

// watch(() => props.top5WishlistedProd, (newTop5WishlistedProd) => {
//     console.log('Top 5 wishlisted products changed')
//     console.log(newTop5WishlistedProd)
//     Object.keys(newTop5WishlistedProd).forEach(key => {
//         const product = newTop5WishlistedProd[key];
//         top5WishlistedProductsActual.value.push(product.id);
//     });    
//     Object.keys(newTop5WishlistedProd).forEach(key => {
//         const product = newTop5WishlistedProd[key];
//         top5WishlistedProductsNumbers.value.push(product["Number Of Wishlists"]);
//     });

//     console.log(top5WishlistedProductsActual.value)
//     console.log(top5WishlistedProductsActual.value
//     .sort((a, b) => b - a)
//     .slice(0, 5))
//     console.log(top5WishlistedProductsNumbers.value)
//     console.log(top5WishlistedProductsNumbers.value
//     .sort((a, b) => b - a)
//     .slice(0, 5))
// })

onMounted(() => {
  console.log('Mounted')
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

.titles-and-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* .product-card {
    height: 20%;
    width: 20%;
} */

</style>