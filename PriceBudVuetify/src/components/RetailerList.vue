<template>
  <v-container class = "table-container">
    <!-- Header -->
    <v-row>
      <h2 class="title">Retailer List</h2>
    </v-row>

    <!-- Table -->
    <v-row>
      <v-simple-table class ="full-width">
        <template v-slot:default>
          <thead>
            <tr>
              <th style="width: auto;">No</th>
              <th style="width: auto;">Price</th>
              <th style="width: auto;">Retailer</th>
              <th style="width: auto;">Date</th>
              <th style="width: auto;">Location</th>
              <th style="width: auto;">Input By</th>
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
            <!-- Add additional rows as needed -->
            <tr>
              <!-- Add additional rows as needed -->
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // Component logic goes here
};
</script>

<style scoped>
.title {
  font-family: 'poppins';
  font-weight: bold;
}
.table-container {
  width: 100%; /* Ensure the container fills out the available width */
}

.full-width {
  width: 100%;
   /* Ensure the table fills out the available width */
  font-family: 'poppins';
  font-weight: normal;
}

/* Adjust column widths as needed */

</style>
