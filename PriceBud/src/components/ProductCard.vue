<template>
    <div class="product-card">
        <!-- Your template code here -->
        <h3 class="poppins-regular">{{ props.product.name }}</h3>
        <img class="product-image" :src="props.product.image" alt="product image">
        <h1 class="poppins-semibold">{{ props.product.price }}</h1>
        <div class="pricechange-container">
            <svg-icon 
                class="icon"
                type="mdi" 
                :path="mdiArrowDown"
                color="green">
            </svg-icon> 
            <p class="poppins-regular">
                <span class="font-green">${{  props.product.pricechange }}</span> 
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


const props = defineProps({
  product: {
    type: Object,
    required: true
  }
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