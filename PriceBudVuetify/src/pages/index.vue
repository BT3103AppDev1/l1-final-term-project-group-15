<template>
  <v-app>
    <SearchBar />
    <SearchResults />
  </v-app>
</template>

<script>
  import SearchResults from '../components/SearchResults.vue'
  import SearchBar from '../components/SearchBar.vue'

  export default {
    components: {
      SearchResults,
      SearchBar
    }
  }
</script>
