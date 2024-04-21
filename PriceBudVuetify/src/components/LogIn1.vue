<template>

    <div class="d-flex align-center mt-5">
        <!-- <img src="/Users/bachnguyen/Downloads/Screenshot_2024-04-03_at_2.43.16_PM-removebg-preview.png" alt="Logo" class="mr-2 ml-4" style="height: 24px;"> Adjust height as needed -->
        <span class="title"><strong>PriceBud</strong></span>
    </div>

    <h1 id = "mainHead"> Welcome back! Log in here</h1>

    <div id="firebaseui-auth-container"></div>

</template>

<script>
import firebase from '@/uifire.js'
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
    name:"LogIn",

    mounted() {
        var ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }

        var uiConfig = {
            signInSuccessUrl: '/HomePage',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ]
        };
        ui.start("#firebaseui-auth-container", uiConfig)
    }
}
</script>

<style scoped> 

#firebaseui-auth-container{
    margin-top: 50px;
    margin-bottom: 50px;
 
}

#pagecontent {
    height: 100px;
    font-size: larger;
    font-weight: bolder;
    text-align: center;
}
#mainHead{
    text-align: center;
    font-family: "poppins";
    background-color: #347AE2;
    color: white;
}

</style>