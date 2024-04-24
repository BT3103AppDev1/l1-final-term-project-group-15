<template>
    <v-container class="table-container">
      <!-- Header -->
      <v-row>
        <v-col>
          <h3 class="title">Retailer List</h3>
        </v-col>
      </v-row>
      <!-- Data Table -->
      <v-data-table
        :headers="headers"
        :items="retailerList"
        :sort-by = "[{key: 'Price', order: 'asc'}, {key: 'Date', order: 'desc'}]"
        multi-sort
        class="elevation-1"
        dense
        outlined
      ></v-data-table>
    </v-container>
</template>

<script>
import {doc, collection, getDocs, getDoc } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'

export default {
  data() {
    return {
      retailerList: [],
      headers: [
        { title: 'Price', value: 'Price' },
        { title: 'Retailer', value: 'Retailer' },
        { title: 'Date', value: 'Date' },
        { title: 'Location', value: 'Location' },
        { title: 'Input By', value: 'User' },
      ]
    }
  },

  props: {
    product: String,
    userEmail: String
  },

      watch: {
        product: {
          immediate: true,
          handler: 'fetchRetailerList'
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
        async fetchRetailerList() {
          if (this.product) {
            const db = getFirestore();
            const productRef = doc(db, 'Products', this.product);
            const productSnap = await getDoc(productRef);

            if (productSnap.exists()) {
              const productData = productSnap.data();
              // Add Shopee, Lazada, and Amazon data to the retailerList
              this.retailerList = [
                {
                  Price: `$${productData['Shopee Current']}`,
                  Retailer: 'Shopee',
                  Date: this.formatDate(productData['Shopee Current Date']),
                  Location: 'E-Commerce',
                  User: 'Shopee'
                },
                {
                  Price: `$${productData['Lazada Current']}`,
                  Retailer: 'Lazada',
                  Date: this.formatDate(productData['Lazada Current Date']),
                  Location: 'E-Commerce',
                  User: 'Lazada'
                },
                {
                  Price: `$${productData['Amazon Current']}`,
                  Retailer: 'Amazon',
                  Date: this.formatDate(productData['Amazon Current Date']),
                  Location: 'E-Commerce',
                  User: 'Amazon'
                }
              ];
            }


            const collectionRef = collection(db, 'Products', this.product, 'UserInputs');
            const querySnapshot = await getDocs(collectionRef);

            this.retailerList = this.retailerList.concat(querySnapshot.docs
            .filter(doc => doc.id !== 'TestUser')
            .map((doc, index) => {
              let data = doc.data();
                return { // Add a 'no' field that is the index + 1
                  Price: `$${data.Price}`, // Add a '$' sign in front of the price
                  Retailer: data.Retailer,
                  Date: this.formatDate(data.Date),
                  Location: data.Location,
                  User: data.User
                };
            }));
          } else {
            console.log('Product ID is null!');
          }
        },
      }
};
</script>

<style scoped>
.title {
  font-family: 'poppins';
  font-weight: 500;
}

.elevation-1 {
  font-family: 'poppins';
}

/* Style for table headers */
.v-data-table-header {
  font-weight: bold;
}
.table-container{
  border-radius: 8px;
}
</style>
