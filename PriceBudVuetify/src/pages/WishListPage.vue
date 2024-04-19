<template>
    <div class="page-container">
  
      <div class="sidebar">
        <SideBar />
      </div>
  
      <div class = "container">
        <HeaderComponent />
        <WishList />

      </div>
    </div>


    <h2>{{ item }}</h2>
  </template>
  
  <script>
  import SideBar from '../components/SideBar.vue'
  import HeaderComponent from '../components/HeaderComponent.vue'
  import WishList from '../components/WishList.vue'

  export default {
    props: ['item'],

    components: {
      SideBar,
      HeaderComponent,
      WishList,

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

  .page-container {
    display: flex;
    flex: 8;
    margin: 0;
  }
  
  .sidebar {
    flex: 2;
  }
  
  </style>