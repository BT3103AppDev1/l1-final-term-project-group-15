<template>
    <v-container class="container">
      <v-row align = "center">
        <v-col cols ="2" class = "pic">
          <v-avatar size="100">
            <img class = "avatar" src="https://www.google.com.vn/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FShashank_%2528director%2529&psig=AOvVaw2WPJfL4rfytg02dl2Ft273&ust=1713955819255000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIiXspCV2IUDFQAAAAAdAAAAABAI" alt="Profile Picture">
          </v-avatar>
        </v-col>
        <v-col cols = 3 class = "name">
          <h2>{{ userName }}</h2>
        </v-col>
        <v-col>
          <p>Joined on {{ joinDate }}</p>
        </v-col>
        <v-col class="text-end">
          <v-btn color="primary" small rounded>Edit Profile</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userName: 'Nguyen Bach',
        joinDate: '20 May 2024',
      }
    },
  }
  </script>

  <style scoped>
    .pic {
    padding-right: 0;
  }
  .name {
    padding-left: 0;
  }
  
  .avatar {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
  .container {
    /* Add your custom styles here */
    font-family: 'Poppins';
  }
  </style>