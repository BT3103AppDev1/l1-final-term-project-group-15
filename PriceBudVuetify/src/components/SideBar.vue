<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app id="navDrawer">
      <!-- Logo and Title -->
      <div class="d-flex align-center mt-5" style="margin-bottom: 6vh; font-family: 'Poppins', 'sans-serif'; font-weight: 500; font-style: normal">
        <img src="../assets/icon.png" alt="Logo" class="mr-2 ml-4" style="height: 32px;">
        <span style="font-size: larger;" class="title">PriceBud</span>
      </div>
      <!-- Sidebar content -->
      <v-list>
        <v-list-item :class="{ 'active-list-item': $route.path === '/HomePage' }" to="/">
          <template v-slot:prepend>
            <v-icon>mdi-view-dashboard</v-icon>
          </template>
          <v-list-item-title>Home Page</v-list-item-title>
        </v-list-item>

        <v-list-item :class="{ 'active-list-item': $route.path === '/WishListPage' }" link to="/WishListPage">
          <template v-slot:prepend>
            <v-icon>mdi-heart</v-icon>
          </template>
          <v-list-item-title>Wishlist</v-list-item-title>
        </v-list-item>

        <v-list-item :class="{ 'active-list-item': $route.path === '/ProfilePage' }" link to="/ProfilePage">
          <template v-slot:prepend>
            <v-icon>mdi-account</v-icon>
          </template>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>

        <v-list-item :class="{ 'active-list-item': $route.path === '/CommunityPage' }" link to="/CommunityPage">
          <template v-slot:prepend>
            <v-icon>mdi-account-group</v-icon>
          </template>
          <v-list-item-title>Community</v-list-item-title>
        </v-list-item>

        <v-list-item :class="{ 'active-list-item': $route.path === '/SettingPage' }" link to="/SettingPage">
          <template v-slot:prepend>
            <v-icon>mdi-cog</v-icon>
          </template>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-list class = "bottom-sidebar-items">
        <v-list-item link to="/Help Centre">
          <v-list-item-icon>
            <v-icon>mdi-help-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Help Centre</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/Contact us">
          <v-list-item-icon>
            <v-icon>mdi-email</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Contact us</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


        <v-list-item v-if="isLoggedIn" @click="handleSignout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-else @click="handleSignin">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Log In</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Add more sidebar items as needed -->
      </v-list>
    </v-navigation-drawer>

    <!-- Main content area -->
    <v-main>
      <!-- Page content goes here -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue';
  import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  const drawer = ref(true);

  const isLoggedIn = ref(false)

  let auth

  const router = useRouter();

  onMounted(() => {
    auth = getAuth() 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLoggedIn.value = true
      } else {
        isLoggedIn.value = false
      }      
    })
  })

  function handleSignout() {
    signOut(auth)
  }

  function handleSignin() {
    router.push('/LogIn1')
  }
</script>

<style>
 .bottom-sidebar-items {
  margin-top: 50%;
 }

  #navDrawer > * {
    margin: 15px;
  }

  .active-list-item {
    background-color: white;
    color: rgba(53, 123, 226, 1);
  }

  .v-list-item-title {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: small;
    color:rgb(92, 105, 135);
  }

  .v-icon {
    color:rgb(90, 102, 132);
  }

  .v-list-item__prepend {
    width: 3hv;
  }
</style>