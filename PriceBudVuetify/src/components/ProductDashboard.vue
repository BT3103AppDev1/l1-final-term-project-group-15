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
  
  <script>
  import firebaseApp from '../firebase.js';
  import { getFirestore, doc, getDoc } from "firebase/firestore";
  
  const db = getFirestore(firebaseApp);
  
  export default {
    data() {
      return {
        lowestPrice: "",
        YTDlowestPrice: "",
        highestPrice: "",
        wishListed: "",
        highestPriceDate: "",

      };
    },
    computed: {
      cards() {
        return [
          {
            variant: 'elevated',
            title: `$${this.lowestPrice}`,
            headline: 'Current Price',
            content: '3% up since last week',
            arrow: '↑',
            direction: 'down',
            image: 'mdi-trophy'
          },
          {
            variant: 'elevated',
            title: `$${this.YTDlowestPrice}`,
            headline: 'Lowest Price',
            content: 'Since 14 Feb 2024',
            arrow: '',
            direction: '',
            image: 'mdi-star'
          },
          {
            variant: 'elevated',
            title: `$${this.highestPrice}`,
            headline: 'Highest Price',
            content: 'Since ' + this.highestPriceDate,
            arrow: '',
            direction: '',
            image: 'mdi-flag'
          },
          {
            variant: 'elevated',
            title: `${this.wishListed}`,
            headline: 'Monthly Views',
            content: '3% up since last week',
            arrow: '↑',
            direction: 'up',
            image: 'mdi-heart'
          }
        ];
      }
    },
    props: {
      product: String
    },
    watch: {
      product: {
        immediate: true,
        handler: 'fetchFigure'
      }
    },
    methods: {
      getArrowClass(direction) {
        return direction === 'up' ? 'arrow up' : 'arrow down';
      },
      async fetchFigure() {
        const docRef = doc(db, 'Products', this.product);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data().CalculatedFields;
          this.lowestPrice = data.LowestPrice;
          this.YTDlowestPrice = data.YTDLowestPrice;
          this.highestPrice = data.Highestprice[1];
          const dateStr = data.Highestprice[0];
          const year = dateStr.substring(0, 4);
          const month = dateStr.substring(4, 6);
          const day = dateStr.substring(6, 8);
          const date = new Date(year, month - 1, day);
          const options = { day: '2-digit', month: 'short', year: 'numeric' };
          this.highestPriceDate = date.toLocaleDateString('en-US', options);
          this.wishListed = data.WishListed;
        } else {
          console.log('No such document!');
        }
      }
    }
  };
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
  