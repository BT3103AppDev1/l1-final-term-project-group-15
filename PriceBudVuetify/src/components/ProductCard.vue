<template>
    <v-container  v-if="inWishlistView">
        <!-- wishlist row product card -->
        <div class="product-card">
            <h3 class="poppins-regular">{{ props.product.name }}</h3>
            <img class="product-image" :src="props.product.image" alt="product image">
            <h1 class="poppins-semibold">{{ props.product.price }}</h1>
            <div class="pricechange-container">
                <v-icon icon="mdi-arrow-down" color="green"/>
                <p class="poppins-regular">
                    <span class="font-green">${{  props.product.pricechange }}</span> 
                    since wishlisting
                </p>
            </div>
        </div>
    </v-container>
    <v-container v-else>
        <!-- if in the insight row -->  


    </v-container>
</template>

<script setup>
import { defineProps } from 'vue'


const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  inWishlistView: {
    type: Boolean,
    default: true
  }

})
// Other options here
</script>

<style scoped>
/* Your component styles here */
.product-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.pricechange-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.product-image {
    width: 70%;
}

.font-green {
  color: green;
}


</style>