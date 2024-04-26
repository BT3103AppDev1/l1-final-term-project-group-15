<template>
    <v-container class = "container">
      <h3 class="text-h3">Contact Us</h3>
  
      <v-card class="mb-4">
        <v-card-title>Contact Information</v-card-title>
        <v-card-text>
          <p>For inquiries, feedback, or assistance, you can reach us through the following:</p>
          <p>Email: supportMaster@gmail.com</p>
          <p>Phone: +65 9999 9999</p>
        </v-card-text>
      </v-card>
  
      <v-card>
        <v-card-title>Contact Form</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field v-model="formData.name" label="Your Name"></v-text-field>
            <v-btn type="submit" color="primary" small rounded>Submit</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          name: '',
        }
      }
    },
    methods: {
      submitForm() {
  
        console.log('Form submitted with data:', this.formData);

      }
    }
  };
  </script>
  
  <style scoped>
  .text-h3 {
    font-family: 'Poppins';
    margin-bottom: 20px;
  }
  .container {
    font-family: 'Poppins';
  }
  </style>
  