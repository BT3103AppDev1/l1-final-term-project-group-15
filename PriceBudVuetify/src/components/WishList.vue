<template>
    <v-container class="container">
      <h2>Marci's Wishlist</h2>
      <h5 class="subtitle">Everything you love, in one place</h5>
      <v-row class ="buttonrow">
        <v-col cols="auto">
          <v-btn class = "button1" color ="green" small rounded @click="newProduct">
            <v-icon left>mdi-plus</v-icon>
            New Product
          </v-btn>
        </v-col>
        <v-col cols ="auto">
          <v-btn class= "button2" color = "blue" small rounded @click="sendWishlist">
            <v-icon left>mdi-send</v-icon>
            Send Wishlist
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    methods: {
      newProduct() {
        // Handle the click event for the "New Product" button
      },
      sendWishlist() {
        // Handle the click event for the "Send Wishlist" button
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
}

.container {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  font-family: 'poppins';
  font-weight: 400;
}
.buttonrow {
  display: flex;
  justify-content: left;
}
</style>