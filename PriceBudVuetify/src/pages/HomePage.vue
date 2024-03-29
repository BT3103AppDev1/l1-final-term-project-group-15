<template>
    <div>This is the home page</div>
    <!-- <SideBar /> -->
    <Header />
    <SearchBar />
    <RowCards v-for="product in products" :key="product.id" :products="product" 
              title="Your Wishlist at a glance"
              description="descripition"/>
  
</template>

<script>
// import Sidebar from './Sidebar.vue'
import SearchBar from '../components/SearchBar.vue'
import RowCards from '../components/RowCards.vue'
import ProductCard from '../components/ProductCard.vue'
import SideBar from '../components/SideBar.vue'
import Header from '../components/Header.vue'



export default {
  components: {
    SearchBar,
    RowCards,
    ProductCard,
    // SideBar,
    Header
  },
  data() {
    return {
      products: [
        // your products data here...
        [
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
      ]
    }
  }
}
</script>

<style>
.home {
  display: flex;
}

.main-content {
  flex-grow: 1;
}

</style>
