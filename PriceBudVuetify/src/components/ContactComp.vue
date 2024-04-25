<template>
    <v-container>
      <h1>Contact Us</h1>
  
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
          <!-- Add your contact form component here -->
          <v-form @submit.prevent="submitForm">
            <v-text-field v-model="formData.name" label="Your Name"></v-text-field>
            <!-- Add more input fields for email, message, etc. as needed -->
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
  h1 {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 22px;
    padding-bottom: 2vh;
  }

  p {
    padding-bottom: 1vh;
  }
  </style>
  