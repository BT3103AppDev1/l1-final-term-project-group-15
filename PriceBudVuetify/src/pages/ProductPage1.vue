<template>
    <v-sheet class="page-container">

      <SideBar class="sidebar" />
  
      <v-container v-if="userEmail" class="right-container">
        <HeaderProduct />
        <ProductButton :product = "product" :key = "product" :userEmail = "userEmail" />
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
          <RetailerList :product = "product" :key = "product" :userEmail = "userEmail"/>
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
  import ProductButton from '@/components/ProductButton.vue'
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
      ProductButton,
      ProductDashboard,
      ProductPicture,
      ProductTrend,
      ProductDescription,
      RetailerList
    }

  }
  </script>
  
  <style scoped>
  .home {
    display: flex;
  }
  
  .main-content {
    flex-grow: 1;
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
  
  .right-containe {
    width: 80%; /* Adjust this value based on your needs */
    overflow-y: auto;
    height: 100vh;
  }
  
  .sidebar {
    min-width: 120px;
    width: 20%; /* Adjust this value based on your needs */
    height: 100vh;
    overflow-y: auto;
  }
  
  </style>