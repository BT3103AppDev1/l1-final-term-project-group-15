<template>
    <v-container>
      <!-- Product Picture -->
      <v-row>
          <v-img :src="productImage" aspect-ratio="auto"></v-img>
      </v-row>

      <v-row class="rating-row">
      <v-rating v-model="rating" :half-increments="true" color="yellow" dense readonly></v-rating>
      </v-row>
  
      <!-- Alert Box -->
      <v-row class = "alert-row">
          <div class="alert-box">
            <strong>Send me an alert when price drops</strong>
            <v-btn class = "alert-button" color="red" small rounded>Alert me</v-btn>
          </div>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { doc, getDoc } from 'firebase/firestore';
  import { getFirestore } from 'firebase/firestore'
  export default {
    // Component logic goes here
    data() {
      return {
        productImage: "",
        rating: ""

      }
    },
    props: {
      product: String
    },
    watch: {
      product: {
        immediate: true,
        handler: 'fetchProductImage'
      }
    },
    methods: {
      async fetchProductImage() {
        if (this.product) {
          const db = getFirestore();
          const docRef = doc(db, 'Products', this.product);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            this.productImage = docSnap.data().Image;
            this.rating = docSnap.data().Rating;
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
  .rating-row {
    display: flex;
    justify-content: center;
  }
  .alert-row {
    justify-content: center;
  }
  .alert-box {

    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 5%;
    display: flex;
    flex-direction: column;
    font-family: 'poppins';
    font-weight:500;
    justify-content: center;
  }

  </style>
  