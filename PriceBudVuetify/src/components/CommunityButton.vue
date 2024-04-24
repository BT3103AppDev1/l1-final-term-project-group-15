<template>
          <v-menu offset-y>
            <!-- Activator Button -->
            <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          Activator slot
        </v-btn>
      </template>
  
            <!-- Menu Items -->
            <v-list>
                <v-list-item @click="sortBy('largest')">
                    <v-list-item-title>Largest to Smallest</v-list-item-title>
                </v-list-item>
              <v-list-item @click="sortBy('smallest')">Smallest to Largest</v-list-item>
              <v-list-item @click="sortBy('recent')">Most Recent</v-list-item>
            </v-list>
          </v-menu>
  </template>
  
  <script>  
  export default {
    data() {
      return {}
    },
            
    props: {
      product: String,
      userEmail: String
    },
  
    methods: {
        sortBy(option) {
        // Handle sorting logic based on the selected option
            switch (option) {
                case 'largest':
                // Sort from largest to smallest
                break;
                case 'smallest':
                // Sort from smallest to largest
                break;
                case 'recent':
                // Sort by most recent
                break;
                default:
                break;
            }
        }
    }
}
</script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: row ;
  }
  .right-button{
    width: 50px;
    margin-left: auto;
    margin-right: 10px;
    border-radius: 8px;
  }
  .left-button{
    width: 50px;
    border-radius: 8px;
  }
  </style>
  