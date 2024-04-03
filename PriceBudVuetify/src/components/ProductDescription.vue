<template>
    <v-container>
      <!-- Product Description Header -->
      <v-row class ="description">
        <v-col>
          <v-card>
            <v-card-title class="title">Product Description</v-card-title>
            <v-card-text>
              <!-- Product Description -->
              {{ productDescription }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

  <script>
  export default {
    data() {
      return {
        productDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      }
    },

  }
  </script>
  
  <style scoped>
  /* Component-specific styles */
  .description{
    font-family: 'poppins';
  }
  .title{
    font-weight: bold;
  }

  </style>
  