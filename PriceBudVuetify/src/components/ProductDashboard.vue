<template>
    <!-- Produict dashboadrd-->
    <v-container>
      <v-row align="center" justify="center">
        <v-col
          v-for="(card, i) in cards"
          :key="i"
          cols="3"
        >
          <v-card
          :variant="card.variant"
          class="mx-auto card"
          max-width="100%"
          max-height="auto"
          >
          <!-- different cards for different infomations-->
            <v-card-item>
              <div class="card-content">
                <div class="title-icon">
                  <div class="text-h6">{{ card.title }}</div>
                  <v-icon>{{ card.image }}</v-icon>
                </div>
                <div class="text-overline mb-1">{{ card.headline }}</div>
                <div class="text-caption">
                  <span :class="getArrowClass(card.direction)">
                    {{ card.arrow }}
                  </span>
                  {{ card.content }}
                </div>
              </div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  const cards = [
    {
      variant: 'elevated',
      title: '$150',
      headline: 'Current Price',
      content: '3% up since last week',
      arrow: '↑',
      direction: 'down',
      image: 'mdi-trophy' // Specify the icon for this card
    },
    {
      variant: 'elevated',
      title: '$75',
      headline: 'Lowest Price',
      content: 'Since 14 feb 2024',
      arrow: '',
      direction: '',
      image: 'mdi-star' // Specify the icon for this card
    },
    {
      variant: 'elevated',
      title: '$200',
      headline: 'highest Price',
      content: 'Since 20 feb 2024',
      arrow: '',
      direction: '',
      image: 'mdi-flag' // Specify the icon for this card
    },
    {
      variant: 'elevated',
      title: '1000',
      headline: 'Monthly Views',
      content: '3% up since last week',
      arrow: '↑',
      direction: 'up',
      image: 'mdi-heart' // Specify the icon for this card
    }
  ];
  
  function getArrowClass(direction) {
    return direction === 'up' ? 'arrow up' : 'arrow down';
  }
  </script>
  
  <style scoped>

  .card-content {
    display: flex;
    flex-direction: column;

  }

  .text-overline {
    font-family: "poppins";
  }

  .text-caption {
    font-family: "poppins";
  }
  .text-h6 {
    font-family: "poppins";
  }

  .title-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .arrow.up {
    color: #4CAF50; /* Green for up */
  }
  
  .arrow.down {
    color: #F44336; /* Red for down */
  }
  
  </style>
  