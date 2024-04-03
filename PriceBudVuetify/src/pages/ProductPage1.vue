<template>
    <div class="page-container">
  
      <div class="sidebar">
        <SideBar />
      </div>
  
      <div class = "container">
        <HeaderComponent />
        <ProductDashboard />
        <ProductTrend />
        <div class = "container2">
          <div class ="picture-container">
          <ProductPicture />
          </div>
          <div class ="description-container">
          <ProductDescription />
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import SideBar from '../components/SideBar.vue'
  import HeaderComponent from '../components/HeaderComponent.vue'
  import ProductDashboard from '../components/ProductDashboard.vue'
  import ProductTrend from '../components/ProductTrend.vue'
  import ProductPicture from '../components/ProductPicture.vue'
  import ProductDescription from '../components/ProductDescription.vue'
  
  
  export default {
    components: {
      SideBar,
      HeaderComponent,
      ProductDashboard,
      ProductPicture,
      ProductTrend,
      ProductDescription,
    }

  }
  </script>
  
  <style>
  .home {
    display: flex;
  }
  
  .main-content {
    flex-grow: 1;
  }
  
  .container {
    flex: 8;
    display: flex;
    flex-direction: column;
  }
  .container2 {
    display: flex;
    flex-direction: row;
    flex: 1;
  }
  .picture-container {
    display: flex;
    flex: 3.8;
  }
  .description-container {
    display: flex;

    flex: 7.2;

  }
  
  .page-container {
    display: flex;
    flex: 8;
    margin: 0;
  }
  
  .sidebar {
    flex: 2;
  }
  
  </style>