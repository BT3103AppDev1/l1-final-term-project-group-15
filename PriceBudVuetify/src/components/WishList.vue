<template>
      <h2 class="title">Marci's Wishlist</h2>
      <h5 class="subtitle">Everything you love, in one place</h5>
      <v-card class = "list">
        <template v-slot:text>
          <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            single-line
          ></v-text-field>
        </template>
       <v-data-table
        :headers="headers"
        :items="wishlist"
        :search="search"
        ></v-data-table>
      </v-card>
</template>
  
<script>
  import { doc, getDoc } from 'firebase/firestore';
  import { getFirestore } from 'firebase/firestore'
  export default {
    data() {
      return {
        wishlist: [],
        search: "",
        headers: [
          { title: "Product Name", value: "Name" },
          { title: "Unit Price", value: "Price" },
          { title: "Price Change", value: "PriceChange" },
          { title: "Retailer", value: "Retailer"},
          {title: "Price Trend", value: "pricetrend"}
        ]    
      };
    },
    props: {
      product: String
    },
    watch: {
      product: {
        immediate: true,
        handler: 'fetchProductData'
      }
    },
    methods: {
      async fetchProductData() {
        if (this.product) {
          const db = getFirestore();
          const docRef = doc(db, 'Products', this.product);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            this.wishlist.push(docSnap.data());
          } else {
            console.log('No such document!');
          }
        } else {
          console.log('Product ID is null!');
        }
      }
    }
  };
</script>

<style scoped>
.subtitle {
  font-weight: 400;
  font-family: 'poppins';
  color: grey;
  margin-bottom: 5%;
  margin-left: 2%;
}
.title {
  font-family: 'poppins';
  font-weight: bold;
  margin-left: 2%;
}

.list {
  margin-left: 2%;
  margin-right: 5%;
  font-family: 'poppins';
}

.container {
  display: flex;
  flex-direction: column;
  align-items: left;

  justify-content: center;
  font-family: 'poppins';
  font-weight: 400;
}

</style>