<template>
    <v-container>

        <div v-if="toggleOn" class="product-card">
            
            <h3 class="poppins-semibold">{{ productName }}</h3>
            <img class="product-image" :src="image_path" alt="product image">
            <div class="info-div">
                <h1 class="poppins-semibold centre">{{ rating }}</h1>
                <v-icon>mdi-star</v-icon>
            </div>
            <p class="poppins-regular">
                All time rating
            </p>
            
        </div>
        
        <div v-else class="product-card">
            
            <h3 class="poppins-semibold">{{ productName }}</h3>
            <img class="product-image" :src="image_path" alt="product image">
            <div class="info-div">
                <h1 class="poppins-semibold centre">{{ numWishlisted }}</h1>
                <v-icon>mdi-account</v-icon>
            </div>
            <p class="poppins-regular">
                Wishlists with this product
            </p>
        </div>
        
    </v-container>

</template>

<script setup>

defineProps({
    productName: {
        type: Array,
        default: () => {}
    },
    rating: {
        type: Number
    },
    numWishlisted: {
        type: Number
    },
    image_path: {
        type: String,
        default: ''
    },
    toggleOn: {
        type: Boolean
    }
})


</script>

<style>
.poppins-semibold {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
}

.poppins-regular {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
}
.poppins-medium {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-style: normal;
}

.product-image {
    height: 180px;
    width: fit-content;
    margin: 10%;
}

.centre {
    text-align: center;
}

.info-div {
    display: flex;
    justify-content: center;
    align-items: center;
}

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

</style>