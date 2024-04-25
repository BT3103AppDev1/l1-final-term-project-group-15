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
        :items="formattedWishlist"
        :search="search"
        >
        <template v-slot:item.image_path="{ item }">
          <img :src="item.image_path" alt="Product Image" width="100">
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn small rounded color="red" @click="deleteProduct(item)"><strong>Delete</strong></v-btn>
        </template>
        <template v-slot:item.pricetrend="{ item }">
          <ProductTrend2 :product="item.id" :retailer = "retailer" />
        </template>
      </v-data-table>
      </v-card>
</template>
  
<script>
  import { doc, getDoc } from 'firebase/firestore';
  import { getFirestore, updateDoc, deleteField } from 'firebase/firestore'
  import ProductTrend2 from './ProductTrend2.vue';
  export default {
    data() {
      return {
        retailer:"",
        wishlist: [],
        search: "",
        headers: [
          {title:"", value: "actions", align: "start"},
          { title: "", value: "image_path", aligh:"center"},
          { title: "Product Name", value: "Name", align: "center"},
          { title: "Unit Price", value: "Current Price", align: "center"},
          { title: "Price Change", value: "Price Change", align: "center"},
          { title: "Retailer", value: "Retailer", align: "center"},
          {title: "Price Trend", value: "pricetrend", align: "center"}
        ]    
      };
    },
    components: {
      ProductTrend2
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

    computed: {
      formattedWishlist() {
        return this.wishlist.map(item => {
          return {
            id: item.id,
            'image_path': item['image_path'],
            'Name': item['Name'],
            'Current Price': `$${item['Current Price']}`,
            'Price Change': `$${item['Price Change']}`,
            'Retailer': item['Current Retailer'],
            'pricetrend': 'Price Trend'
          };
        });
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

            for (let productId in wishlist) {
              const productDocRef = doc(db, 'Products', productId);
              const productDocSnap = await getDoc(productDocRef);
              this.retailer = productDocSnap.data()['Current Retailer'];

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
          [`Wishlist.${product.id}`]: deleteField()
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