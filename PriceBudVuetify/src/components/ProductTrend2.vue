<template>
    <v-container class="proTrend">

        <v-sparkline :model-value = "chartData"
        :auto-line-width = false
        :gradient = gradients[5]
        :line-width = 10
        :smooth = "50 || false"
        :padding = 8
        :stroke-lineCap = 'round'
        :type = 'trend'
        auto-draw></v-sparkline>
    </v-container>
  </template>
  
  <script>
  import firebaseApp from '../firebase.js';
  import { getFirestore, doc, getDoc } from "firebase/firestore";
  const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]
  const db = getFirestore(firebaseApp);
  
  export default {
    data() {
          return {
              gradients,
              chartData: [],
              lowprice: Infinity,
              items: [
                { title: 'Monthly' },
                { title: 'Daily' },
              ],
          }
      },
    props: {
      product: String,
      retailer: String
    },
    watch: {
        product: {
          immediate: true,
          handler: 'fetchDataByMonth'
        }
    },
    methods: {

      async fetchDataByMonth() {
        const docRef = doc(db, 'Products', this.product);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
  
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
          const prices = Object.values(aggregateByMonth(docSnap.data()[this.retailer]));
          this.chartData = prices;
        } else {
          console.log('No such document!');
        }
      },
    }
  }
  </script>
  
  
  <style scoped>
  .proTrend{
    width: 150px;  
    height: 70px;

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