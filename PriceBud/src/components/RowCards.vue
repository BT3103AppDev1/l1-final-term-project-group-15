<template>
    <div class="content-container">
        <v-sheet color="FFFFFF" elevation="4">
            <h1 class="title poppins-semibold">{{ title }}</h1>
            <h3 class="desc poppins-regular">{{ description }}</h3>
            
            <!-- Product Cards -->
           <product-card />

        </v-sheet>
    </div>

</template>


<script setup>
import { defineProps } from 'vue'
import ProductCard from './ProductCard.vue'


defineProps({
    title: String,
    description: String
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

</style>