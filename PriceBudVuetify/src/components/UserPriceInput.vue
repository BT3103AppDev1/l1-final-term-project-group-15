<template>
  <v-container>
    <div id="firstContainer">
      <div>
        <h1>Community Price Input</h1>
        <p>Contribute to the community and input attractive prices that you know!</p>
      </div>
      <div>
        <v-btn class = "openDialog" @click="dialog = true" color="primary">Input Details</v-btn>

        <v-dialog v-model="dialog" width="auto">
          <v-card  width="800">
            <v-card-title>Text here</v-card-title>
            <v-card-text>Text here</v-card-text>
            <v-card-actions>
              <v-btn @click="dialog = false">Cancel</v-btn>
              <v-btn class = "ms-auto" color="primary" @click="submit">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </div>
    </div>
  </v-container>
</template>
<script setup>


</script>
<style>

</style>