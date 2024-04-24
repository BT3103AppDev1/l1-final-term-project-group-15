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
  import { getFirestore, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
  
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
  
        // Atomically add a new product ID to the "wishlist" array field.
        await updateDoc(userRef, {
          Wishlist: arrayUnion(this.product)
        });
  
        this.$router.push({ name: 'ProductToWishList', params: { id: this.product } });
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
  
