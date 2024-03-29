<template>
    <div class="content-container">
        <v-sheet color="FFFFFF" elevation="4">
            <h1 class="title poppins-semibold">{{ title }}</h1>
            <h3 class="desc poppins-regular">{{ description }}</h3>

            <!-- Product Cards -->
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
            <!-- <ProductCard /> -->

        </v-sheet>
    </div>

</template>


<script setup>
import { defineProps } from 'vue'
import ProductCard from './ProductCard.vue'


defineProps({
    title: String,
    description: String,
    products: Array
})
</script>


<style scoped>
.v-sheet {
    padding: 2%;
}

.content-container {
    width: 70vw;
    height: 20vh;
}

.test {
    display: flex;
    justify-content: row;
}
</style>