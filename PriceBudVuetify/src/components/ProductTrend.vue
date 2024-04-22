<template>
  <v-card class="mx-auto text-center" color="white">
    <v-card-text class="title">
      <div class="text-p font-weight-thin">
        Kodak M35 35mm Film Camera - Price Trend
      </div>
      <v-spacer></v-spacer>
    </v-card-text>

    <line-chart :data="chartData" :curve="false">
    </line-chart>
  </v-card>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  data: () => ({
    chartData: [],
  }),
  props: {
    product: String
  },
  watch: {
      product: {
        immediate: true,
        handler: 'fetchData'
      }
  },
  methods: {
    async fetchData() {
      const docRef = doc(db, 'Products', this.product);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Extracting the priceTrend data from the document
        this.chartData = docSnap.data().PriceTrend;
      } else {
        console.log('No such document!');
      }
    },
  }
}
</script>


<style scoped>
.title {
    display: flex;
}

.text-p {
    font-size: 1rem;
    font-family: 'poppins';
}

.v-card-text {
    padding: 0.6rem;
}
</style>