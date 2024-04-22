<template>
    <v-sheet class="page-container">
  
      <SideBar class="sidebar" />
  
      <v-container v-if="userEmail" class="right-container">
        <HeaderProduct />
        <AddButton :product = "product" :key = "product" :userEmail = "userEmail" />
        <ProductDashboard :product = "product"/>
        <ProductTrend :product = "product"/>
        <div class = "container2">
          <div class ="picture-container">
          <ProductPicture :product = "product" :key = "product"/>
          </div>
          <div class ="description-container">
          <ProductDescription :product = "product" :key = "product" />
          <RetailerList :product = "product" :key = "product"/>
          </div>
        </div>

        <!--Testing-->
        <h1>This is a page for product: {{ $route.params.id }}</h1>
      </v-container>
      
      <v-container v-else class="right-container">
        <HeaderProduct />
        <ProductDashboard :product = "product"/>
        <ProductTrend :product = "product"/>
        <div class = "container2">
          <div class ="picture-container">
          <ProductPicture :product = "product" :key = "product"/>
          </div>
          <div class ="description-container">
          <ProductDescription :product = "product" :key = "product" />
          <RetailerList :product = "product" :key = "product"/>
          </div>
        </div>

        <!--Testing-->
        <h1>This is a page for product: {{ $route.params.id }}</h1>
      </v-container>
      
    </v-sheet>

  </template>
  
  <script>
  import SideBar from '../components/SideBar.vue'
  import HeaderProduct from '../components/HeaderProduct.vue'
  import ProductDashboard from '../components/ProductDashboard.vue'
  import ProductTrend from '../components/ProductTrend.vue'
  import ProductPicture from '../components/ProductPicture.vue'
  import ProductDescription from '../components/ProductDescription.vue'
  import RetailerList from '@/components/RetailerList.vue'  
  import AddButton from '@/components/AddButton.vue'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'

  export default {
    data() {
      return {
        product: null,
        auth: null,
        userEmail: null
      }
    },
    mounted() {
      this.product = this.$route.params.id

      this.auth = getAuth()
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.userEmail = user.email
          console.log(this.userEmail)
          console.log('test')
        } 
      })
    },
    components: {
      SideBar,
      HeaderProduct,
      AddButton,
      ProductDashboard,
      ProductPicture,
      ProductTrend,
      ProductDescription,
      RetailerList
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
    flex: 2.8;
  }
  .description-container {
    display: flex;
    flex-direction: column;
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