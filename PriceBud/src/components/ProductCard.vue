<template>
    <div class="product-card">
        <!-- Your template code here -->
        <h3 class="poppins-regular">{{ product.name }}</h3>
        <img class="product-image" :src="product.image" alt="product image">
        <h1 class="poppins-semibold">{{ product.price }}</h1>
        <div class="pricechange-container">
            <svg-icon 
                class="icon"
                type="mdi" 
                :path="mdiArrowDown"
                color="green">
            </svg-icon> 
            <p class="poppins-regular">
                <span class="font-green">${{  product.pricechange }}</span> 
                since wishlisting
            </p>


        </div>
        
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

// import icons
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiArrowDown } from '@mdi/js'


defineProps({
  product: {
    type: Object,

    // placeholder product info
    default: () => ({
      name: 'Apple iPhone 14',
      image: `https://imagedelivery.net/JAV112JY973Crznn4xb8Sg/41816e80-a4b4-47bb-de71-cc19edbfb400/mobile`,
      price: '$799',
      pricechange: 50.0
    }),
  },
})
// Other options here
</script>

<style scoped>
/* Your component styles here */
.product-card {
    width: 25%;
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