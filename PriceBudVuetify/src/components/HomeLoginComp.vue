<template>
    <v-sheet class="main">
        <v-container class="top-row">
            <v-container>
                <h1 class="title poppins-semibold">Have an account?</h1>
                <h3 class="desc poppins-regular">Log in to access your wishlist, 
                    or contribute to price updates</h3>
            </v-container>
            <v-container class="d-flex justify-end">
                <v-btn class="login-btn" color="primary" dark @click="login">LOG IN</v-btn>    
            </v-container>
        </v-container>

        <h1 class="title poppins-semibold text-center">-OR-</h1>

        <v-container class="bottom-row">
            <v-container>
                <h1 class="title poppins-semibold">Don't have an account?</h1>
                <h3 class="desc poppins-regular">Create an account to gain access to 
                    community features and wishlist
                </h3>
            </v-container>
            <v-container class="d-flex justify-end">
                <v-btn class="login-btn" color="primary" dark @click="signup">Create Account</v-btn>    
            </v-container>
        </v-container>


    </v-sheet>


</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const login = () => {
  router.push('/LogIn1');
};

const signup = () => {
  router.push('/SignIn');
};

defineExpose({
  login,
  signup
});
</script>


<style scoped>
    .poppins-semibold {
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
    }

    .poppins-regular {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    .poppins-bold {
        font-family: "Poppins", sans-serif;
        font-weight: 700;
        font-style: normal;
    }

    .main {
        display: flex;
        flex-direction: column;
    }

    .top-row, .bottom-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    

</style>

