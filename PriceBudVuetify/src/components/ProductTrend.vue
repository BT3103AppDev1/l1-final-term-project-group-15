<template>
  <v-container>
    <v-card class="proTrend" color="white">
      <v-card-text class="title">
        <div class="text-p font-weight-thin">
          <strong> {{product}} - Price Trend </strong>
        </div>
        <v-spacer></v-spacer>
        <v-menu>
        <!-- activates the menu dropdown -->
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn> 
        </template>

        <v-list-item>
          <v-list-item-title>
            <v-btn @click="fetchDataByMonth" style="border: 1px solid">Monthly</v-btn>
            <v-btn @click="fetchDataByDay" style="border: 1px solid">Daily</v-btn>
          </v-list-item-title>
      </v-list-item>
      </v-menu>
      </v-card-text>

      <line-chart :data="chartData" prefix="$" :min = "lowprice"></line-chart>
    </v-card>
  </v-container>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  data() {
        return {
            chartData: [],
            lowprice: Infinity,
            items: [
              { title: 'Monthly' },
              { title: 'Daily' },
            ],
        }
    },
  props: {
    product: String
  },
  watch: {
      product: {
        immediate: true,
        handler: 'fetchDataByMonth'
      }
  },
  methods: {
    async fetchDataByDay() {
      const docRef = doc(db, 'Products', this.product);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          const combinedChartData = [];

          const aggregateByDay = (data) => {
              Object.keys(data).forEach(date => {
                  let smallestNumber = Infinity; // Set initial smallest number to positive infinity
                      const price = Number(data[date]);
                      if (!isNaN(price)) { // Check if it's a valid number
                          if (price < smallestNumber) {
                              smallestNumber = price;
                          }
                  }
                  if (smallestNumber - 10 < this.lowprice) {
                      this.lowprice = smallestNumber - 10;
                  }
              });
              return data; // Moved the return statement outside the loop
          };

          combinedChartData.push({ name: 'Amazon', data: aggregateByDay(docSnap.data().Amazon) });
          combinedChartData.push({ name: 'Lazada', data: aggregateByDay(docSnap.data().Lazada) });
          combinedChartData.push({ name: 'Shopee', data: aggregateByDay(docSnap.data().Shopee) });

          this.chartData = combinedChartData;
      } else {
          console.log('No such document!');
      }
    },
    async fetchDataByMonth() {
      const docRef = doc(db, 'Products', this.product);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const combinedChartData = [];

        // Helper function to format and aggregate data by month
        const aggregateByMonth = (data) => {
          const monthlyData = {};
          Object.keys(data).forEach(date => {
            const monthYear = parseInt(date/ 100)
            if (!monthlyData[parseInt(monthYear*100 + 1)]) {
              monthlyData[parseInt(monthYear*100 + 1)] = [];
            }
            monthlyData[parseInt(monthYear*100 + 1)].push(parseInt(data[date]));
          });
          
          // Calculate average for each month (or choose another aggregation method)
          const result = {};
            Object.keys(monthlyData).forEach(month => {
              let smallestNumber = Infinity; // Set initial smallest number to positive infinity
              for (const priceStr in monthlyData[month]) {
                const price = Number(monthlyData[month][priceStr]);
                if (!isNaN(price)) { // Check if it's a valid number
                  if (price < smallestNumber) {
                    smallestNumber = price;
                  }
                }
              }
              result[month] = smallestNumber;
              if(smallestNumber - 10 < this.lowprice) {
                this.lowprice = smallestNumber - 10;
              }
              
            });
            return result;
        };

        combinedChartData.push({ name: 'Amazon', data: aggregateByMonth(docSnap.data().Amazon) });
        combinedChartData.push({ name: 'Lazada', data: aggregateByMonth(docSnap.data().Lazada) });
        combinedChartData.push({ name: 'Shopee', data: aggregateByMonth(docSnap.data().Shopee) });

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