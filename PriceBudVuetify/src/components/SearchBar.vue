<template>
    <v-container>
      <h3 class="search">Search Product</h3>
      <v-autocomplete
        rounded
        auto-select-first
        :placeholder="selectedProduct ? '' : 'Select a product'"
        :items="products"
        density="comfortable" 
        variant="solo"
        menu-icon= ""
        v-model ="selectedProduct"
        @update:model-value="select"
        

      ></v-autocomplete>
    </v-container>
</template>
<script>
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs  } from 'firebase/firestore'

export default {
  data() {
    return {
      products: [],
      selectedProduct: null
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
  methods: {
    select(selectedProduct) {
      console.log(selectedProduct)
      if (selectedProduct) {
        this.$router.push({ name: 'HomeToProduct', params: { id: this.selectedProduct } })
      }
    }
  }
};
</script>

<style>
  .search {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 24px;
    margin-bottom: 8px;
    margin-left: 4px;
  }
</style>