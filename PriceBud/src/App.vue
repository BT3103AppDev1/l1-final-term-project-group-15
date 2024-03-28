<script setup>
import RowCards from './components/RowCards.vue'

// Array of ProductCard components
const products = [
    {
        "name": "Samsung Galaxy S24",
        "image": "https://images.samsung.com/is/image/samsung/p6pim/sg/2401/gallery/sg-galaxy-s24-plus-sm-s926bzvcxsp-thumb-539308136?$GNB_CARD_FULL_M_PNG_PNG$",
        "price": "$699",
        "pricechange": "100.0"
    },
    {
        "name": "iPhone 14",
        "image": `https://imagedelivery.net/JAV112JY973Crznn4xb8Sg/41816e80-a4b4-47bb-de71-cc19edbfb400/mobile`,
        "price": "$999",
        "pricechange": "150.0"
    },
    {
        "name": "Samsung Galaxy S24",
        "image": "https://images.samsung.com/is/image/samsung/p6pim/sg/2401/gallery/sg-galaxy-s24-plus-sm-s926bzvcxsp-thumb-539308136?$GNB_CARD_FULL_M_PNG_PNG$",
        "price": "$699",
        "pricechange": "100.0"
    },
    {
        "name": "iPhone 14",
        "image": `https://imagedelivery.net/JAV112JY973Crznn4xb8Sg/41816e80-a4b4-47bb-de71-cc19edbfb400/mobile`,
        "price": "$999",
        "pricechange": "150.0"
    }
]
console.log(products.length)
console.log(products)
</script>

<template>
<div class="app-container">
  <div id="wishlist">
    <RowCards 
      title="Your wishlist, at a glance"
      description="Have a look at what changed since the last time you were here"
      :products="products" />
  </div>

  <!-- <div class="insights">
    <RowCards
      title="Largest price changes this week"
      description="These products had  the biggest jumps/drops in price this week" 
      :products="products"/>
  </div> -->
</div>
  

</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
}

.insights {
  margin-top: 25%;
}


</style>
