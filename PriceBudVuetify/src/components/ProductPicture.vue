<template>
    <v-container>
      <!-- Product Picture -->
      <v-row>
        <v-col cols="12">
          <v-img src="https://m.media-amazon.com/images/I/61M7hjWPzvL._AC_UF1000,1000_QL80_.jpg" aspect-ratio="1"></v-img>
        </v-col>
      </v-row>
  
      <!-- Alert Box -->
      <v-row>
        <v-col cols="12">
          <div class="alert-box">
            <strong>Send me an alert when price drops</strong>
            <v-btn color="red">Alert me</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    // Component logic goes here
  };
  </script>
  
  <style scoped>
  .alert-box {
    border: 1px solid #ccc;
    padding: 20px;
    margin-top: 20px;
  }
  </style>
  