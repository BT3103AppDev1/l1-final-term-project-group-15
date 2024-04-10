<template>
    <div class="page-container">
  
      <div class="sidebar">
        <SideBar />
      </div>
  
      <div class = "container">
        <HeaderComponent />
        <ProductDashboard />
        <div class = "container2">
          <div class ="picture-container">
          <ProductPicture />
          </div>
          <div class ="list-container">
          <RetailerList />
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import SideBar from '../components/SideBar.vue'
  import HeaderComponent from '../components/HeaderComponent.vue'
  import ProductDashboard from '../components/ProductDashboard.vue'
  import ProductPicture from '../components/ProductPicture.vue'
  import RetailerList from '../components/RetailerList.vue'
  
  
  
  export default {
    components: {
      SideBar,
      HeaderComponent,
      ProductDashboard,
      ProductPicture,
      RetailerList,
    }

  }
  </script>
  
  <style>

  * {
  margin: 0;
  padding: 0;
  /*box-sizing: border-box;*/
  }

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
    flex: 2.8;
  }
  .list-container {
    display: flex;
    flex: 8;
    justify-content: center;

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
  