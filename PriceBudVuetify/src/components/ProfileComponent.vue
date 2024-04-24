<template>
    <v-container class = "container">
        <v-row>
            <v-card class = "card1">
                <v-card-title>Preferences</v-card-title>
                <v-card-text class = "text1">
                    <p>Online products</p>
                    <p>Second-hand items</p>
                </v-card-text>
            </v-card>
        </v-row>
        <v-row>
            <v-card class = "card2">
                <v-card-title>Biography</v-card-title>
                <v-card-text>
                    47 year-old tech enthusiast from AMK
                </v-card-text>
            </v-card>
        </v-row>
        <v-row>
            <v-card class = "card3">
                <v-card-title>Contact</v-card-title>
                <v-card-text>
                    <p>Tel: +65 93453494</p>
                    <p>Email: nguyenbach0111@gmail.com</p>
                    <p>Linkedin:</p>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>

<style scoped>


.container {
    font-family: "Poppins";
}
.card1 {
    border: none !important;
    box-shadow: none;
}

.card2 {
    border: none !important;
    box-shadow: none;
}

.card3 {
    border: none !important;
    box-shadow: none;
}
</style>