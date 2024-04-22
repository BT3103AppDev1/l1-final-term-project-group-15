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
        lowestPriceDate: "",
        YTDlowestPrice: "",
        YTDlowestPriceDate: "",
        highestPrice: "",
        highestPriceDate: "",
        wishListed: "",
        wishListedDate: "",
      };
    },
    computed: {
      cards() {
        return [
          {
            variant: 'elevated',
            title: `$${this.lowestPrice}`,
            headline: 'Current Price',
            content: 'Since ' + this.lowestPriceDate,
            image: 'mdi-trophy'
          },
          {
            variant: 'elevated',
            title: `$${this.YTDlowestPrice}`,
            headline: 'Lowest Price',
            content: 'Since ' + this.YTDlowestPriceDate,
            image: 'mdi-star'
          },
          {
            variant: 'elevated',
            title: `$${this.highestPrice}`,
            headline: 'Highest Price',
            content: 'Since ' + this.highestPriceDate,
            image: 'mdi-flag'
          },
          {
            variant: 'elevated',
            title: `${this.wishListed}`,
            headline: 'Monthly Views',
            content: 'Since ' + this.wishListedDate,
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
      formatDate(dateStr) {
        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(4, 6);
        const day = dateStr.substring(6, 8);
        const date = new Date(year, month - 1, day);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      },
      async fetchFigure() {
        const docRef = doc(db, 'Products', this.product);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data().CalculatedFields;
          this.lowestPrice = data.LowestPrice[1];
          this.lowestPriceDate = this.formatDate(data.LowestPrice[0]);
          this.YTDlowestPrice = data.YTDLowestPrice[1];
          this.YTDlowestPriceDate = this.formatDate(data.YTDLowestPrice[0]);
          this.highestPrice = data.HighestPrice[1];
          this.highestPriceDate = this.formatDate(data.HighestPrice[0]);
          this.wishListed = data.WishListed[1];
          this.wishListedDate =this.formatDate(data.WishListed[0]);
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
    align-items: left;
  }
  
  .arrow.up {
    color: #4CAF50; /* Green for up */
  }
  
  .arrow.down {
    color: #F44336; /* Red for down */
  }
  
  </style>
  