<template>
  <v-container class="firstContainer">

    <v-container class = "results">
      <v-card v-for="(product, index) in products" :key="index" class="product-card">
        <v-img :src="product.image" alt="Product Image"></v-img>
        <v-card-title>{{ product.name }}</v-card-title>
        <v-card-subtitle>{{ product.brand }}</v-card-subtitle>
        <v-card-text>{{ product.details }}</v-card-text>
      </v-card>
    </v-container>

    <v-container class = "filters">
      <v-expansion-panels>
        <div class="panel-container">
          <v-expansion-panel class="panel">
            <v-expansion-panel-title> Brands </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-chip-group column multiple>
                <v-chip variant="outlined" filter> Apple </v-chip>
                <v-chip variant="outlined" filter> Samsung </v-chip>
                <v-chip variant="outlined" filter> Sony </v-chip>
                <v-chip variant="outlined" filter> Dell </v-chip>
                <v-chip variant="outlined" filter> Asus </v-chip>
                <v-chip variant="outlined" filter> HP </v-chip>
              </v-chip-group>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel class="panel">
            <v-expansion-panel-title> Categories </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-chip-group column multiple>
                <v-chip variant="outlined" filter> Headphones </v-chip>
                <v-chip variant="outlined" filter> Mobile Phones </v-chip>
                <v-chip variant="outlined" filter> Laptops </v-chip>
                <v-chip variant="outlined" filter> Desktops </v-chip>
                <v-chip variant="outlined" filter> Speakers </v-chip>
              </v-chip-group>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel class="panel">
            <v-expansion-panel-title> Price Range </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-chip-group column multiple>
                <v-chip variant="outlined" filter> $0 - $500 </v-chip>
                <v-chip variant="outlined" filter> $500 - $1000 </v-chip>
                <v-chip variant="outlined" filter> $1000 - $2000 </v-chip>
                <v-chip variant="outlined" filter> $2000 - $3000 </v-chip>
                <v-chip variant="outlined" filter> >$3000 </v-chip>
              </v-chip-group>
            </v-expansion-panel-text>
          </v-expansion-panel>

        </div>
      </v-expansion-panels>
    </v-container>

  </v-container>
</template>
<script>
  export default {
    data() {
      return {

        /*Database Replacement */
        products: [
          {
            name: "Product 1",
            brand: "Brand A",
            details: "Details of Product 1",
            image: "path/to/product1-image.jpg"
          },
          {
            name: "Product 2",
            brand: "Brand B",
            details: "Details of Product 2",
            image: "path/to/product2-image.jpg"
          }
        ]
      }
    }
  }
</script>

<style>
  .firstContainer {
    display: flex;

  }
  .filters {
    flex: 30;
    display: flex;
    flex-wrap: wrap;

    /*Just for visualisation*/
    background-color: red;
  }
  .panel {
    width: 300px;
  }
  .results {
    flex: 70;

    /*Just for visualisation*/
    background-color: blue;
  }
  .product-card {
    margin: 10px; 
  }
</style>