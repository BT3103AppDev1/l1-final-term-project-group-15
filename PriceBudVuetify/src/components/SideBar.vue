<template>
    <v-app>
      <v-navigation-drawer v-model="drawer" app>
        <!-- Sidebar content -->
        <v-list>
          <v-list-item link to="/HomePage">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home Page</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/Wishlist">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Wishlist</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/Profile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/Community">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Community</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/Setting">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Setting</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/Help Centre">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Help Centre</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/Contact us">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Contact us</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/Log out">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
          <!-- Add more sidebar items as needed -->
        </v-list>
      </v-navigation-drawer>
  
      <!-- Main content area -->
      <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>My App</v-toolbar-title>
      </v-app-bar>
  
      <v-main>
        <!-- Page content goes here -->
        <router-view></router-view>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawer: false
      };
    }
  };
  </script>
  