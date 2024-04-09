<template>
    <v-container>
    <div v-if="isWishlist" class="content-container">
        <v-sheet color="FFFFFF" elevation="4">
            <h1 class="title poppins-semibold">{{ title }}</h1>
            <h3 class="desc poppins-regular">{{ description }}</h3>

            <!-- Product Cards -->
            <v-carousel hide-delimiters height="100%">
                <v-carousel-item v-for="(product, i) in products" :key="i">
                    <div class="card-container">
                        <ProductCard :product="product" />
                        <ProductCard :product="product" />
                        <ProductCard :product="product" />
                        <ProductCard :product="product" />
                    </div>
                    
                </v-carousel-item>
            </v-carousel>


        </v-sheet>
    </div>
    <div v-else class="content-container">
        <v-sheet color="FFFFFF" elevation="4">
            <h1 class="title poppins-semibold">{{ title }}</h1>
            <h3 class="desc poppins-regular">{{ description }}</h3>

            <!-- Product Cards -->
            <!-- for each insight, different data from Product object is required -->
            <v-carousel hide-delimiters height="100%">
                <v-carousel-item v-for="(product, i) in products" :key="i">
                    <div class="test">
                        <ProductCard :product="product" />
                        <ProductCard :product="product" />
                        <ProductCard :product="product" />
                        <ProductCard :product="product" />
                    </div>
                    
                </v-carousel-item>
            </v-carousel>
       
        </v-sheet>
    </div>
    </v-container>
</template>


<script setup>
import { defineProps } from 'vue'
import ProductCard from './ProductCard.vue'


defineProps({
    title: String,
    description: String,
    products: Array,
    isWishlist: Boolean
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