<template>
      <h2 class="title">Your Wishlist</h2>
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
        >
        <template v-slot:item.image_path="{ item }">
          <img :src="item.image_path" alt="Product Image" width="100">
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn small rounded color="red" @click="deleteProduct(item)"><strong>Delete</strong></v-btn>
        </template>
      </v-data-table>
      </v-card>
</template>
  
<script>
  import { doc, getDoc } from 'firebase/firestore';
  import { getFirestore, updateDoc, arrayRemove } from 'firebase/firestore'
  import ProductTrend from './ProductTrend.vue';
  export default {
    data() {
      return {
        wishlist: [],
        search: "",
        headers: [
          {title:"", value: "actions", align: "start"},
          { title: "", value: "image_path"},
          { title: "Product Name", value: "Name" },
          { title: "Unit Price", value: "Current Price" },
          { title: "Price Change", value: "Price Change" },
          { title: "Retailer", value: "Retailer"},
          {title: "Price Trend", value: "pricetrend"}
        ]    
      };
    },
    props: {
      product: String,
      userEmail: String
    },
    watch: {
      userEmail: {
        immediate: true,
        handler: 'fetchProductData'
      }
    },

    methods: {
      async fetchProductData() {
        console.log(this.product)
        console.log(this.userEmail)
        if (this.userEmail) {
          const db = getFirestore();
          const userDocRef = doc(db, 'Users', this.userEmail);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const wishlist = userDocSnap.data().Wishlist || [];
            this.wishlist = [];

            for (let productId of wishlist) {
              const productDocRef = doc(db, 'Products', productId);
              const productDocSnap = await getDoc(productDocRef);

              if (productDocSnap.exists()) {
                let productData = productDocSnap.data();
                productData.id = productDocSnap.id;
                productData.Name = productDocSnap.id;
                this.wishlist.push(productData);
              } else {
                console.log(`No such document: ${productId}`);
              }
            }
          } else {
            console.log('No such document!');
          }
        } else {
          console.log('Product ID is null!');
        }
      },
      async deleteProduct(product) {
        const db = getFirestore();
        const userDocRef = doc(db, 'Users', this.userEmail);

        // Remove the product from the wishlist array in Firestore
        await updateDoc(userDocRef, {
          Wishlist: arrayRemove(product.id)
        });

        // Remove the product from the local wishlist array
        const index = this.wishlist.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.wishlist.splice(index, 1);
        }
      },
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