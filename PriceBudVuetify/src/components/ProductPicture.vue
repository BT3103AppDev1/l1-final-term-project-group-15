<template>
    <v-container>
      <!-- Product Picture -->
      <v-row>
          <v-img src="https://m.media-amazon.com/images/I/61M7hjWPzvL._AC_UF1000,1000_QL80_.jpg" aspect-ratio="auto"></v-img>
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
  export default {
    // Component logic goes here
  };
  </script>
  
  <style scoped>
  .alert-row {
    justify-content: center;
  }
  .alert-box {
    margin-top: 5%;
    border: 1px solid #ccc;
    padding: 20px;
    display: flex;
    flex-direction: column;
    font-family: 'poppins';
    font-weight:500;
    justify-content: center;
  }

  </style>
  