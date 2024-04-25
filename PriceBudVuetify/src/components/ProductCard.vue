<template>
    <v-container class="main-content" v-if="inWishlistView">
        <!-- wishlist row product card -->
        <div class="product-card" @click="redirectProductPage()">
            <h3 class="poppins-semibold">{{ fullName }}</h3>
            <img class="product-image" :src="imageurl" alt="product image">
            <h1 class="poppins-semibold price-margin">{{ price }}</h1>
            <div class="pricechange-container" v-if="priceChange != 0">
                <v-icon :icon="priceChange >= 0 ? 'mdi-arrow-up' : 'mdi-arrow-down'" 
                    :color="priceChange >= 0 ? 'red' : 'green'"/>                
                <p class="poppins-regular">
                    <span :style="{ color: priceChange >= 0 ? 'red' : 'green' }">${{ Math.abs(priceChange) }}</span>
                    since wishlisting
                </p>
            </div>
            <div class="pricechange-container" v-else>
                <p class="poppins-regular">
                    No change since wishlisting
                </p>
            </div>
        </div>
    </v-container>
    <v-container class="main-content" v-else>
        <!-- if in the insight row -->  
        <div class="product-card" @click="redirectProductPage()" v-if="reviewInsight">
            <!-- <h3 class="poppins-semibold">{{ top5ReviewedProducts[itemNumber].id }}</h3>
            <img class="product-image" :src="top5ReviewedProducts[itemNumber].image_path" alt="product image">
            <h1 class="poppins-semibold price-margin">{{ top5ReviewedProducts[itemNumber].Ratings }}</h1> -->
            <div class="pricechange-container" v-if="priceChange != 0">
                <v-icon :icon="priceChange >= 0 ? 'mdi-arrow-up' : 'mdi-arrow-down'" 
                    :color="priceChange >= 0 ? 'red' : 'green'"/>                
                <p class="poppins-regular">
                    <span :style="{ color: priceChange >= 0 ? 'red' : 'green' }">${{ Math.abs(priceChange) }}</span>
                    since wishlisting
                </p>
            </div>
            <div class="pricechange-container" v-else>
                <p class="poppins-regular">
                    No change since wishlisting
                </p>
            </div>
        </div>

        <div class="product-card" @click="redirectProductPage()" v-else>
            <!-- <h3 class="poppins-semibold">{{ top5WishlistedProducts[itemNumber].id }}</h3>
            <img class="product-image" :src="top5WishlistedProducts[itemNumber].image_path" alt="product image">
            <h1 class="poppins-semibold price-margin">{{ top5WishlistedProducts[itemNumber].NumWishlisted }}</h1> -->
            <div class="pricechange-container" v-if="priceChange != 0">
                <v-icon :icon="priceChange >= 0 ? 'mdi-arrow-up' : 'mdi-arrow-down'" 
                    :color="priceChange >= 0 ? 'red' : 'green'"/>                
                <p class="poppins-regular">
                    <span :style="{ color: priceChange >= 0 ? 'red' : 'green' }">${{ Math.abs(priceChange) }}</span>
                    since wishlisting
                </p>
            </div>
            <div class="pricechange-container" v-else>
                <p class="poppins-regular">
                    No change since wishlisting
                </p>
            </div>
        </div>


    </v-container>
</template>

<script setup>
import { defineProps, onMounted, onBeforeMount, ref } from 'vue'
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { useRouter } from 'vue-router'

let fullName = ref('')
let price = ref('')
let imageurl = ref('')
let priceChange = ref(0)

let top5ReviewedProducts = []
let top5WishlistedProducts = []

const router = useRouter()
const props = defineProps({
  productName: String,
  inWishlistView: {
    type: Boolean,
    default: true
  },
    wishlistedPrice: {
        type: Number,
        default: 0
    },
    itemNumber: Number,
    reviewInsight: {
        type: Boolean,
        default: true
    }
})

function redirectProductPage() {
  console.log('redirecting to product page')
  router.push({ name: 'HomeToProduct', params: { id: props.productName } })
}

onBeforeMount (() => {
  console.log('created')
  console.log(props.productName)
  console.log(props.wishlistedPrice)
})

onMounted (async () => {
    const db = getFirestore()
    const docRef = doc(db, 'Products', props.productName)
    const docSnap = await getDoc(docRef)

    const querySnapshotAllProd = await getDocs(collection(db, 'Products'))

    querySnapshotAllProd.forEach((doc) => {
        const product = doc.data();
        product.id = doc.id; // Include the document ID in the product data
        const entryRev = {
            id: product.id,
            Ratings: product.Ratings,
            image_path: product.image_path
        }
        top5ReviewedProducts.push(entryRev);  
        const entryWish = {
            id: product.id,
            NumWishlisted: product["Number Of Wishlists"],
            image_path: product.image_path
        };
        top5WishlistedProducts.push(entryWish);
    
    });
    
    top5ReviewedProducts = top5ReviewedProducts
        .sort((a, b) => b.Ratings - a.Ratings)
        .slice(0, 5);

    top5WishlistedProducts = top5WishlistedProducts
        .sort((a, b) => b.NumWishlisted - a.NumWishlisted)
        .slice(0, 5);

    console.log(top5ReviewedProducts)
    console.log(top5WishlistedProducts)

    if (docSnap.exists()) {
        const data = docSnap.data()
        fullName.value = data.brand + ' ' + props.productName // fullName is Brand + productName
        price.value = '$' + data["Current Price"] // edit here to make it dynamic
        imageurl.value = data.image_path
        priceChange.value = props.wishlistedPrice - data["Current Price"]


        console.log(fullName)
        console.log(price)
        console.log(imageurl)
    }

})

// Other options here
</script>

<style scoped>
/* Your component styles here */
/* .main-content {
    margin: 5%;
    display: flex;
} */

.product-card {
    /* width: 100%;
    height: 100%; */
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.pricechange-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.product-image {
    height: 180px;
    width: fit-content;
    margin: 10%;
}

.price-margin {
    margin: 5%;
}   

.font-green {
  color: green;
}
.poppins-regular {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.poppins-medium {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-style: normal;
}

.poppins-semibold {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-style: normal;
}

</style>