<template>
    <v-container class = "container">
      <h1 class="text-h3">Help Center</h1>
  
      <v-card class="mb-4">
        <v-card-title>FAQs</v-card-title>
        <v-card-text>
          <p>This is where you can find frequently asked questions and their answers.</p>
          <p>FAQ 1: How do I reset my password?</p>
          <p>FAQ 2: Can I change my subscription plan?</p>
        </v-card-text>
      </v-card>
  
      <v-card>
        <v-card-title>Knowledge Base</v-card-title>
        <v-card-text>
          <p>This section provides articles and guides to help you use our platform effectively.</p>
          <p> Article 1: Getting Started with Our Platform</p>
          <p> Article 2: Advanced Features Overview</p>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    // Add your component logic here
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  .container {
    font-family: 'Poppins';
  }
  .text-h3 {
    font-family: 'Poppins';
    margin-bottom: 20px;
  }
  </style>
  