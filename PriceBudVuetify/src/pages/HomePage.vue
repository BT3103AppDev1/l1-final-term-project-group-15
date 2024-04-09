<template>
  <v-sheet class="page-container">
  <!-- for parent wrapper use vsheet as vcontainer has default margin -->
  <!-- <router-link to="/SearchResults">Search</router-link> -->
  
    <SideBar class="sidebar" />
    
    <v-container v-if="isLoggedIn" class="right-container">
      <HeaderComponent />
      <SearchBar />
      <RowCards v-for="product in products" :key="product.id" :products="product" 
                :isWishlist="true"
                title="Your wishlist, at a glance"
                description="Have a look at what changed since the last time you were here"/>
      <RowCards :isWishlist="false"
                title="Largest price changes this week"
                description="These products had the biggest price changes this week"/>
                
    </v-container>

    <v-container v-else class="right-container">
      <HeaderComponent />
      <SearchBar />
      <HomeLoginComp />
      <RowCards :isWishlist="false"
                title="Largest price changes this week"
                description="These products had the biggest price changes this week"/>
    </v-container>

  </v-sheet>
</template>

<script>
import SearchBar from '../components/SearchBar.vue'
import RowCards from '../components/RowCards.vue'
import ProductCard from '../components/ProductCard.vue'
import SideBar from '../components/SideBar.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import HomeLoginComp from '../components/HomeLoginComp.vue'


export default {
  components: {
    SearchBar,
    RowCards,
    ProductCard,
    SideBar,
    HeaderComponent,
    HomeLoginComp
  },
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false
    }
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

<style scoped>
.page-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
  margin: auto;
}

.sidebar {
  width: 20%; /* Adjust this value based on your needs */
  height: 100vh;
  overflow-y: auto;
}

.right-container {
  width: 80%; /* Adjust this value based on your needs */
  overflow-y: auto;
  height: 100vh;
}
</style>
