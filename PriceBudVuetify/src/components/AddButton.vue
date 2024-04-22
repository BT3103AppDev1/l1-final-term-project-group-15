<template>
    <v-container class = "container">
        <v-btn class="add-button" color="blue" small rounded @click="addProduct"> 
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-container>
</template>

<script>
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
export default {
    data() {
        return {}
    },
            
    props: {
        product: String,
        userEmail: String
    },

    methods: {
        async addProduct() {
        const db = getFirestore();
        const userRef = doc(db, 'Users', this.userEmail);

        // Atomically add a new product ID to the "wishlist" array field.
        await updateDoc(userRef, {
            Wishlist: arrayUnion(this.product)
         });

        this.$router.push({ name: 'ProductToWishList', params: { id: this.product } });
        }
    }
}

</script>

<style>
    .container {
        display: flex;
    }
    .add-button {
        width: 50px;
        margin-left: auto;
        justify-content: center;
    }
</style>
