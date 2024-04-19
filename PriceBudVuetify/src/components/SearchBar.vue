<template>
    <v-container class="search">
      <v-autocomplete
        rounded
        auto-select-first
        label="Search"
        :items="products"
        density="comfortable" 
        clearable
        variant="solo"

      ></v-autocomplete>
    </v-container>
</template>
<script>
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs, doc } from 'firebase/firestore'

export default {
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    try {
      const db = getFirestore();
      const allProducts = await getDocs(collection(db, "Products"))
      
      allProducts.forEach((product) => {
        console.log(product.id)
        this.products.push(product.id)
      })

      console.log(this.products)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
};
</script>

<style>
  .search {
  }
</style>