<template>
    <div class="content-container">
        <v-sheet color="FFFFFF" elevation="4">
            <h1 class="title">{{ title }}</h1>
            <h3 class="desc">{{ description }}</h3>
            
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
.title {
    font-family: 'Poppins', sans-serif;
    font-weight: 700; /* Semi-Bold */
    font-style: normal;
}

.desc {
    font-family: 'Poppins', sans-serif;
    font-weight: 400; /* Regular */
    font-style: normal;
    color: #7C8DB5;

}

.v-sheet {
    padding: 2%;
}

.content-container {
    width: 70vw;
    height: 20vh;
}

</style>