<template>
    <v-container>
      <!-- Product Description Header -->
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Product Description</v-card-title>
            <v-card-text>
              <!-- Product Description -->
              {{ productDescription }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      
      <!-- Product Photo and Ratings -->
      <v-row>
        <v-col cols="6">
          <v-img :src="productPhoto" width="100%" contain></v-img>
        </v-col>
        <v-col cols="6">
          <!-- Star Ratings -->
          <v-rating :value="rating" readonly></v-rating>
          
          <!-- Custom Alert Box -->
          <v-card class="alert-box">
            <v-card-text>
              <div class="alert-message">Send me an alert when price drops</div>
            </v-card-text>
            <v-card-actions>
              <v-btn class="alert-btn" color="red" @click="alertMe">Alert me</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        productDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        productPhoto: "https://m.media-amazon.com/images/I/61M7hjWPzvL._AC_UF1000,1000_QL80_.jpg",
        rating: 4.5
      }
    },
    methods: {
      alertMe() {
        // Implement alert functionality
      }
    }
  }
  </script>
  
  <style scoped>
  /* Component-specific styles */
  .alert-box {
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 10px;
  }
  
  .alert-message {
    font-weight: bold;
  }
  
  .alert-btn {
    margin-top: 10px;
  }
  </style>
  