<template>
  <div class="page-container">

    <div class="sidebar">
      <SideBar />
    </div>

    <div class = "container">
      <HeaderComponent />
      <SearchBar />
      <SearchResults />
    </div>

  </div>
</template>

<script>
// import Sidebar from './Sidebar.vue'
import SearchBar from '../components/SearchBar.vue'
import SideBar from '../components/SideBar.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import SearchResults from '../components/SearchResults.vue'

  export default {
    components: {
      SearchBar,
      SearchResults,
      SideBar,
      HeaderComponent
    },
  }

</script>