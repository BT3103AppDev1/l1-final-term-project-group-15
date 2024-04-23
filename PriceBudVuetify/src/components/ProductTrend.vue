<template>
  <v-container>
    <v-card class="proTrend" color="white">
      <v-card-text class="title">
        <div class="text-p font-weight-thin">
          <strong> {{product}} - Price Trend </strong>
        </div>
        <v-spacer></v-spacer>
      </v-card-text>

      <button @click="fetchDataByMonth">Monthly</button>
      <line-chart :data="chartData" :curve="true">
      </line-chart>
    </v-card>
  </v-container>
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
        handler: 'fetchDataByDay'
      }
  },

  methods: {
    async fetchDataByDay() {
      const docRef = doc(db, 'Products', this.product);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const combinedChartData = [];

        // Assuming data.Amazon and data.Lazada are objects with date keys and price values
        // Convert Amazon data
        let amazonData = {};
        Object.keys(data.Amazon).forEach(date => {
          amazonData[date] = data.Amazon[date];
        });
        combinedChartData.push({ name: 'Amazon', data: amazonData });

        // Convert Lazada data
        let lazadaData = {};
        Object.keys(data.Lazada).forEach(date => {
          lazadaData[date] = data.Lazada[date];
        });
        combinedChartData.push({ name: 'Lazada', data: lazadaData });

        let shopeeData = {};
        Object.keys(data.Shopee).forEach(date => {
          shopeeData[date] = data.Shopee[date];
        });
        combinedChartData.push({ name: 'Shopee', data: shopeeData });

        this.chartData = combinedChartData;
      } else {
        console.log('No such document!');
      }
    },

    async fetchDataByMonth() {
      const docRef = doc(db, 'Products', this.product);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const combinedChartData = [];

        console.log(data)
        console.log(parseInt(20240101 / 100))


        // Helper function to format and aggregate data by month
        const aggregateByMonth = (data) => {
          const monthlyData = {};
          Object.keys(data).forEach(date => {
            const monthYear = new Date(date).toISOString().substring(0, 7); // 'YYYY-MM'
            console.log(monthYear)
            if (!monthlyData[monthYear]) {
              monthlyData[monthYear] = [];
            }
            monthlyData[monthYear].push(data[date]);
          });
          
          // Calculate average for each month (or choose another aggregation method)
          const result = {};
          Object.keys(monthlyData).forEach(month => {
            const sum = monthlyData[month].reduce((a, b) => a + b, 0);
            const average = sum / monthlyData[month].length;
            result[month] = average;
          });
          return result;
        };

        combinedChartData.push({ name: 'Amazon', data: aggregateByMonth(data.Amazon) });
        combinedChartData.push({ name: 'Lazada', data: aggregateByMonth(data.Lazada) });
        combinedChartData.push({ name: 'Shopee', data: aggregateByMonth(data.Shopee) });

        this.chartData = combinedChartData;
      } else {
        console.log('No such document!');
      }
    },


  }
}
</script>


<style scoped>
.proTrend{
  border-radius: 8px;
}
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