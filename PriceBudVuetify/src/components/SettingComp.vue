<template>
    <v-container class = "container">
      <h3 class="text-h3">Settings</h3>

      <div class="spacer">

      </div>

      
      <!-- Display settings -->
      <v-card class="setting-card">
        <v-card-title class="headline">Display</v-card-title>
        <v-card-text>
        <div class="text-caption">Alarm volume</div>
        <v-slider
        append-icon="mdi-alarm"
        ></v-slider>
        </v-card-text>
        <v-card-text>
          Dark mode
         <v-switch label="Dark"></v-switch>
        </v-card-text>

      </v-card>
      
      <!-- Notification settings -->
      <v-card class="setting-card">
        <v-card-title class="headline">Notifications</v-card-title>
        <v-card-text>
          <v-radio-group>
            <v-radio label="Silence" value="Silence"></v-radio>
            <v-radio label="Vibration" value="Vibration"></v-radio>
            <v-radio label="Sound" value="Sound"></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>
      
      <!-- Account settings -->
      <v-card class="setting-card">
        <v-card-title class="headline">Account</v-card-title>
        <v-card-text>
          Manage your account settings.
          <!-- Add your account settings components here -->
        </v-card-text>
      </v-card>
      
      <!-- Add more setting options as needed -->
    </v-container>
  </template>S
  
  <style scoped>
  .setting-card {
    margin-bottom: 20px;
  }
  .spacer{
    margin: 20px;
  }
  .container {
    font-family: 'Poppins';
  }
  .text-h3 {
    font-family: 'Poppins';
  }
  </style>
  