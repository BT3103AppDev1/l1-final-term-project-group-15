<template>
    <v-container class="search">
      <v-autocomplete
        rounded
        auto-select-first
        label="Search"
        :items="['Iphone 15', 'Iphone 14', 'Iphone 13', 'Samsung Galaxy', 'Samsung Watch', 'Samsung Tablet']"
        density="comfortable" 
        clearable
        variant="solo"

      ></v-autocomplete>
    </v-container>
</template>
<script>
  export default {

  }
</script>

<style>
  .search {
    background-color: blanchedalmond;
  }
</style>