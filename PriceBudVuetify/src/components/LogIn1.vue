<template>
    <img src="../assets/background.jpeg" alt="background" width="100%" height="100%">

    <v-dialog v-model="dialog" width="auto" persistent>
        <v-card class="custom-card">
            <v-card-text style="text-align: center;">
            <img src="../assets/icon.png" alt="PriceBud" width="20%" height="20%">
            </v-card-text>
            <h1 id = "mainHead"> Welcome back! </h1>
            <h4 id = "subHead">  Please enter your details to log in </h4>
            <v-card-text>
                <form @submit.prevent="login" class="registration-form">
                    <input
                        type="email"
                        placeholder="Email address"
                        v-model="email"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        v-model="password"
                    />
                    <button type="submit">Login</button>
                </form>
            </v-card-text>

            <v-card-text class="rerouteLogIn"> 
                Don't have an account?
                <a href="/SignIn"> Sign Up </a>
            </v-card-text>

            <div style="text-align: center;">
                <hr style="width: 40%; margin-top: 10px; float: left;">
                <span style="margin-top: -10px;">or</span>
                <hr style="width: 40%; margin-top: 10px; float: right;">
            </div>

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
    data() { 
        return { 
            email: '', 
            password: '', 
            username:'',
        }; 
    },
    methods: {
        login() {
            firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
                console.log('Successfully logged in');
                this.$router.push('/');
            })
            .catch(error => {
                alert(error.message);
            });
        },
    },
    mounted() {
        var ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }

        var uiConfig = {
            signInSuccessUrl: '/HomePage',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
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
  width: 120%;
  max-width: 600px; 
  height: auto; 
  padding: 20px; 
  background-color: #F5F5F5 ;
  border-color: transparent;
  opacity: 0.97;
}

.registration-form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.rerouteLogIn{
    text-align: center;
}

.registration-form input,
.registration-form button {
    width: 70%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.registration-form input:focus {
    border-color: #4A90E2;
    outline: none;
}

.registration-form button {
    background-color: #4A90E2;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
}

.registration-form button:hover {
    background-color: #357ABD;
}

</style>