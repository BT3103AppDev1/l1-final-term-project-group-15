<template>
  <div class = "first">
    <div class = "one"> Hello </div>
    <div class = "two"> Hello </div>
    <div class = "three"> Hello </div>
  </div>
</template>
<script>
  export default {

  }
</script>
<style>
  .first {
    display: flex;
    flex-wrap: wrap;
    background-color: purple;
  }
  .one {
    background-color: red;
    flex: 0 0 100%;
  }
  .two {
    background-color: blue;
    flex: 1;
  }
  .three {
    background-color: green;
    flex: 2;
  }
</style>