<template>
    <v-container>
      <!-- Product Description Header -->
      <v-row class ="description">
        <v-col>
          <v-card id ="desCard"> 
            <v-card-title class="title">Product Description</v-card-title>
            <v-card-text>
              <!-- Product Description -->
              {{ productDescription }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

  <script>
  import { doc, getDoc } from 'firebase/firestore';
  import { getFirestore } from 'firebase/firestore'
  export default {
    data() {
      return {
        productDescription: "",
      }
    },
    props: {
      product: String
    },
    watch: {
      product: {
        immediate: true,
        handler: 'fetchProductDescription'
      }
    },
  methods: {
    async fetchProductDescription() {
      if (this.product) {
        const db = getFirestore();
        const docRef = doc(db, 'Products', this.product);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.productDescription = docSnap.data().Description;
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('Product ID is null!');
      }
    },
  }
}
  </script>
  
  <style scoped>
  /* Component-specific styles */
  .description{
    font-family: 'poppins';
  }
  .title{
    font-display: flex;
    font-weight: 500;
    text-align: center;
  }
  #desCard{
    border-radius: 8px;
  }

  </style>
  