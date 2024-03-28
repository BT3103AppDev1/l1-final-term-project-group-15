<template>
    <v-container>
      <!-- Header -->
      <v-row>
        <v-col cols="12">
          <h2>Retailer List</h2>
        </v-col>
      </v-row>
  
      <!-- Table -->
      <v-row>
        <v-col cols="12">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Price</th>
                  <th>Retailer</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Input By</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>$45.90</td>
                  <td>B&H Photo</td>
                  <td>15 Dec 2023</td>
                  <td>Tampines St 21 #01-67</td>
                  <td>User 1234</td>
                </tr>
                <tr>
                  <!-- Add additional rows as needed -->
                </tr>
                <tr>
                  <!-- Add additional rows as needed -->
                </tr>
              </tbody>
            </template>
          </v-simple-table>
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
  /* Add component-specific styles here */
  </style>
  