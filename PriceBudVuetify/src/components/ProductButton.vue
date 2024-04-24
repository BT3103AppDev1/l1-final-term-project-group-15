<template>
    <v-container class="container">
      <v-btn class="left-button" color="blue" @click="goBack"> 
        <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
      <v-btn class="right-button" color="blue" @click="addProduct"> 
        <v-icon>mdi-plus</v-icon>
    </v-btn>
    </v-container>
  </template>
  
  <script>
  import { getFirestore, doc, updateDoc, increment, getDoc } from "firebase/firestore";
  
  export default {
    data() {
      return {}
    },
            
    props: {
      product: String,
      userEmail: String
    },
  
    methods: {
      async addProduct() {
        const db = getFirestore();
        const userRef = doc(db, 'Users', this.userEmail);
        const productRef = doc(db, 'Products', this.product);
        const productSnap = await getDoc(productRef);
  
        if (productSnap.exists()) {
          const productData = productSnap.data();
          const currentPrice = productData['Current Price'];

          await updateDoc(userRef, {
            [`Wishlist.${this.product}`]: currentPrice
          });
          await updateDoc(productRef, {
            ['Number Of Wishlisted']: increment(1)
          });
  
          this.$router.push({ name: 'ProductToWishList', params: { id: this.product } });
        }
      },
      goBack() {
        this.$router.go(-1)
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: row;
  }
  .right-button{
    margin-left: auto;
    margin-right: 10px;
    border-radius: 35px;
  }
  .left-button{
    border-radius: 35px;

  }
  </style>
  
