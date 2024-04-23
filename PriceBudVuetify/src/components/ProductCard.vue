<template>
    <v-container v-if="inWishlistView">
        <!-- wishlist row product card -->
        <div class="product-card" @click="redirectProductPage()">
            <h3 class="poppins-regular">{{ fullName }}</h3>
            <img class="product-image" :src="imageurl" alt="product image">
            <h1 class="poppins-semibold">{{ price }}</h1>
            <!-- <div class="pricechange-container">
                <v-icon icon="mdi-arrow-down" color="green"/>
                <p class="poppins-regular">
                    <span class="font-green">${{  props.product.pricechange }}</span> 
                    since wishlisting
                </p>
            </div> -->
        </div>
    </v-container>
    <v-container v-else>
        <!-- if in the insight row -->  


    </v-container>
</template>

<script setup>
import { defineProps, onMounted, onBeforeMount, ref } from 'vue'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

let fullName = ref('')
let price = ref('')
let imageurl = ref('')

const router = useRouter()
const props = defineProps({
  productName: String,
  inWishlistView: {
    type: Boolean,
    default: true
  }
})

function redirectProductPage() {
  console.log('redirecting to product page')
  router.push({ name: 'CardToProduct', params: { id: props.productName } })
}

onBeforeMount (() => {
  console.log('created')
  console.log(props.productName)
})

onMounted (async () => {
  const db = getFirestore()
  const docRef = doc(db, 'Products', props.productName)
  const docSnap = await getDoc(docRef)

if (docSnap.exists()) {
    const data = docSnap.data()
    fullName.value = data.Brand + ' ' + props.productName
    price.value = '$600' // edit here to make it dynamic
    imageurl.value = data.Image


    console.log(fullName)
    console.log(price)
    console.log(imageurl)
  }

})

// Other options here
</script>

<style scoped>
/* Your component styles here */
.product-card {
    /* width: 100%;
    height: 100%; */
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.pricechange-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.product-image {
    height: 180px;
    width: fit-content;
}

.font-green {
  color: green;
}


</style>