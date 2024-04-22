<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <!-- Logo and Title -->
      <div class="d-flex align-center mt-5">
        <!-- <img src="/Users/bachnguyen/Downloads/Screenshot_2024-04-03_at_2.43.16_PM-removebg-preview.png" alt="Logo" class="mr-2 ml-4" style="height: 24px;"> Adjust height as needed -->
        <span class="title"><strong>PriceBud</strong></span>
      </div>
      <!-- Sidebar content -->
      <v-list>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home Page</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/WishListPage">
          <v-list-item-icon>
            <v-icon>mdi-heart</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Wishlist</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/ProfilePage">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/CommunityPage">
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Community</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/SettingPage">
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
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

<style scoped>
 .bottom-sidebar-items {
  margin-top: 50%;
 }
</style>