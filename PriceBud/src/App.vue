<script setup>
import RowCards from './components/RowCards.vue'
</script>

<template>
<div class="app-container">
  <div id="wishlist">
    <RowCards 
      title="Your wishlist, at a glance"
      description="Have a look at what changed since the last time you were here"/>
  </div>

  <div id="insights">
    <RowCards
      title="Largest price changes this week"
      description="These products had  the biggest jumps/drops in price this week" />
  </div>
</div>
  

</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
}

#insights {
  margin-top: 25%;
}


</style>
