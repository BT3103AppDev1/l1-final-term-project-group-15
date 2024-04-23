<template>
    <v-dialog v-model="dialog" width="auto" persistent>
        <v-card class="custom-card">
            <div style="text-align: center;">
            <img src="../assets/icon.png" alt="PriceBud" width="20%" height="20%">
            </div>
            <h1 id = "mainHead"> Welcome back! </h1>
            <h4 id = "subHead">  Please enter your details to sign in </h4>
            <div id="firebaseui-auth-container"></div>
        </v-card>
    </v-dialog>

</template>

<script>
import firebase from '@/uifire.js'
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { ref } from 'vue';


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
    },
    setup(){
        const dialog = ref(true);

        return { dialog };
    }
}
</script>

<style scoped> 

#title{
    text-align: center;
}

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
}
#subHead{
    text-align: center;
    font-family: "poppins";
    font-weight: normal;
}
.custom-card {
  width: 120%; /* Adjust width as needed */
  max-width: 600px; /* Set maximum width */
  height: auto; /* Allow height to adjust based on content */
  padding: 20px; /* Add padding for spacing */
}
</style>