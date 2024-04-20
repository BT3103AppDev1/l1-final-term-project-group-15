<template>
    <v-container class = "container">
        <v-btn class="add-button" color="blue" small rounded @click="addProduct"> 
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            props: {
                product: String
            },
        }
    },

    methods: {
        addProduct() {
            this.$router.push({ name: 'ProductToWishList', params: { id: this.product } })
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
