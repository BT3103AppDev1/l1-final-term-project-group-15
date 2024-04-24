<template>
    <v-container>
      <!-- Button to add a new card -->
      <v-row class="mb-4"> <!-- Add margin-bottom class -->
        <v-col>
          <v-menu offset-y>
            <!-- Activator Button -->
            <template v-slot:activator="{ props }">
              <v-btn color="primary" dark v-bind="props">
                Sort Options <v-icon>mdi-menu-down</v-icon>
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
        </v-col>
        <v-col class="text-right"> <!-- Aligns the button to the right -->
          <v-btn @click="addCard">Add Card</v-btn>
        </v-col>
      </v-row>
  
      <v-card v-for="(card, index) in cards" :key="index" color="#7C8DB5" class="mb-4">
        <v-card-title>Card {{ index + 1 }}</v-card-title>
        <!-- Card content goes here -->
        <v-card-text>
          {{ card.content }}
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: 'Card 1',
          content: 'This is the content of card 1.'
        },
        {
          title: 'Card 2',
          content: 'This is the content of card 2.'
        },
        {
          title: 'Card 3',
          content: 'This is the content of card 3.'
        }
      ]
    };
  },
  methods: {
    addCard() {
      this.cards.push({
        title: `Card ${this.cards.length + 1}`,
        content: `This is the content of card ${this.cards.length + 1}.`
      });
    },
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
};
</script>

<style scoped>
.text-right {
  text-align: right; /* Aligns the button to the right */
}
</style>
   