<template>
  <v-app>
    <v-container class="table-container">
      <!-- Header -->
      <v-row>
        <v-col>
          <h3 class="title">Retailer List</h3>
        </v-col>
      </v-row>
      <!-- Data Table -->
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
        dense
        outlined
      ></v-data-table>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { title: 'No', align: 'start', value: 'no' },
        { title: 'Price', value: 'price' },
        { title: 'Retailer', value: 'retailer' },
        { title: 'Date', value: 'date' },
        { title: 'Location', value: 'location' },
        { title: 'Input By', value: 'inputBy' },
      ],
      items: [
        { no: 1, price: '$45.90', retailer: 'B&H Photo', date: '15 Dec 2023', location: 'Tampines St 21 #01-67', inputBy: 'User 1234' },
        // Add additional items as needed
      ]
    };
  },
};
</script>

<style scoped>
.title {
  font-family: 'poppins';
  font-weight: 500;
}

.elevation-1 {
  font-family: 'poppins';
}

/* Style for table headers */
.v-data-table-header {
  font-weight: bold;
}
</style>
