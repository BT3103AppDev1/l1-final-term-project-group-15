<template>
    <!-- Header -->
    <v-container>
    <v-toolbar density="compact" class="custom-toolbar">
      <!-- title and subtitle-->
      <v-card-title>Welcome Back, {{ username }}
        <p>{{ content }}</p>
      </v-card-title>
      <v-spacer></v-spacer>
      <!-- profile name and setting buutton-->
      <v-icon icon="mdi-trophy" />
      <v-card-subtitle>{{ username }} {{ Surname }}</v-card-subtitle>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>

    </v-container>
  </template>
  
  <script>

  export default {
    data: () => ({
      items: [
        { title: 'Settings' },
        { title: 'Edit Profile' },
        { title: 'Log Out' },
      ],
      username: 'Marci',
      content: 'Here is the information about the searched product',
      Surname: 'Fumons'
    })
  }
  </script>
  
  <style scoped>
  .custom-toolbar {
    font-family: 'poppins'; 
    font-weight: bold;
    background-color: white;
  }
  .custom-toolbar p {
    font-family: 'poppins';
    font-size: 11px; 
    font-weight: bold;
    
  }

  .v-card-title {
    font-weight: bold;
    
  }


  </style>
  
