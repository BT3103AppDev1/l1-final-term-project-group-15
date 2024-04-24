<template>
    <v-container>

        <v-container> 
            <h2 class="title">Our Community Page</h2>
            <h5 class="subtitle">see what others are reviewing about </h5>
        </v-container>

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
              <v-list-item @click="sortBy('popular')">Most Popular </v-list-item>
              <v-list-item @click="sortBy('commented')">Most Commented</v-list-item>
              <v-list-item @click="sortBy('recent')">Most Recent</v-list-item>            </v-list>
          </v-menu>
        </v-col>

        <v-col class="text-right"> <!-- Aligns the button to the right -->
          <v-btn @click="dialog = true"> create <v-icon>mdi-plus</v-icon> </v-btn>
        </v-col>

        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-card-title class ="cardTitle">Create a post</v-card-title>
                <v-card-text>
                    <!-- Form or content for adding a new card goes here -->
                    <v-text-field label="Card Title" v-model="newCardTitle"></v-text-field>
                    <v-textarea label="Card Content" v-model="newCardContent"></v-textarea>
                    <v-text-field label="Product" v-model="newProduct"></v-text-field>
                    <v-text-field label="Brand" v-model="newBrand"></v-text-field>
                    </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="addCard">Post</v-btn>
                    <v-btn color="red darken-1" @click="dialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
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
import { ref } from 'vue';

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
        case 'popular':
          // Sort from largest to smallest
          break;
        case 'commented':
          // Sort from smallest to largest
          break;
        case 'recent':
          // Sort by most recent
          break;
        default:
          break;
      }
    }
  },
  setup() {
    const dialog = ref(false);
    return { dialog };
  }
};
</script>

<style scoped>
.text-right {
  text-align: right; /* Aligns the button to the right */
}
.subtitle {
  font-weight: 400;
  font-family: 'poppins';
  color: grey;
}
.title {
  font-family: 'poppins';
  font-weight: bold;
}
.cardTitle{
    text-align: center;
}
</style>
   