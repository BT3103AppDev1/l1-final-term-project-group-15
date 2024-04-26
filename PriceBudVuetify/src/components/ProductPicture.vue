<template>
    <v-container v-if="isLoggedIn" >
      <!-- Product Picture -->
      <div class = "image-container">
        <v-img :src="productImage" aspect-ratio="auto"></v-img>
      </div>


      <!-- Product Rating-->
      <div class = "rating">
        <v-rating v-model="rating" :half-increments="true" dense readonly></v-rating>
      </div>
      <!-- Alert Box -->
      <v-card class="alert-box">
        <v-card-text class="text1">
          <strong>Send me an alert when price drops</strong>
        </v-card-text>
        <v-card-text class="button">
          <v-btn class = "alert-button" color="red" small rounded @click="dialog = true"> Alert me</v-btn>
        </v-card-text>

        <v-dialog v-model="dialog" width="auto">
          <v-card class="alert-card">
            <v-card-title class="text-h5 title">Alert Confirmed!</v-card-title>
            <v-card-text class="message">
              We will notify you once the price drops.
            </v-card-text>
            <v-divider class="divider"></v-divider>
            <v-card-actions>
              <v-btn color="primary" text @click="dialog = false"> <strong>OK</strong></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>


       </v-card>
    </v-container>

    <v-container v-else>
      <!-- Product Picture -->
      <div class = "image-container">
        <v-img :src="productImage" aspect-ratio="auto"></v-img>
      </div>

      <!-- Product Rating-->
      <v-rating v-model="rating" :half-increments="true" color="yellow" dense readonly></v-rating>

  
      <!-- Alert Box -->
        <v-card class="alert-box">
          <v-card-text class="text1">
            <strong> Sign up to alert me to price drop </strong>
          </v-card-text>
          <v-card-text class="button">
            <v-btn class = "alert-button" color="blue" small rounded @click="redirectLogIn" > Sign up</v-btn>
          </v-card-text>
        </v-card>
    </v-container>
  </template>

  
  <script>
  import { doc, getDoc } from 'firebase/firestore';
  import { getFirestore } from 'firebase/firestore';
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';

  export default {
    data() {
      return {
        productImage: "",
        rating: ""

      }
    },
    props: {
      product: String
    },
    watch: {
      product: {
        immediate: true,
        handler: 'fetchProductImage'
      }
    },
    methods: {
      //fetching product image from firestore
      async fetchProductImage() {
        if (this.product) {
          const db = getFirestore();
          const docRef = doc(db, 'Products', this.product);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            this.productImage = docSnap.data().image_path;
            this.rating = docSnap.data().Ratings;
          } else {
            console.log('No such document!');
          }
        } else {
          console.log('Product ID is null!');
        }
      }
    },
    setup() {
      const router = useRouter();
      const username = ref('');
      const isLoggedIn = ref(false);
      const auth = getAuth();
      const dialog = ref(false);

      const redirectLogIn = () => {
        router.push('/SignIn');
      };

      const onAuthStateChangedHandler = (user) => {
        if (user) {
          isLoggedIn.value = true;
          username.value = user.displayName;
        } else {
          isLoggedIn.value = false;
        }
      };

      onMounted(() => {
        console.log('mounted');
        const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler);
        return unsubscribe;
      });

      return { username, isLoggedIn, redirectLogIn, dialog};
    }
  };
</script>
  
  
  <style scoped>
  .rating {
    display: flex;
    justify-content: center;
  }
  ::v-deep .v-rating .v-icon.v-icon--color {
  color: yellow !important;
  }
  .image-container {
  width: 300px;
  height: 300px; 
  }

  .image-container > .v-image {
  width: auto; /* Make the image take up the full width of its container */
  height: auto; /* This will maintain the aspect ratio of the image */
  }
  .rating-row {
    display: flex;
    justify-content: center;
  }
  .alert-row {
    justify-content: center;
  }
  .alert-box {
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    font-family: 'poppins';
    font-weight:500;
    justify-content: center;
  }
  .button{
    display: flex;
    justify-content: center;
    text-align: center;
    padding-top: 0%;
  }
  .text1{
    text-align: center;
  }
  .alert-card {
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-weight: bold;
  color: #333;
}

.message {
  color: #555;
}

.divider {
  margin: 16px 0;
}

  </style>
  