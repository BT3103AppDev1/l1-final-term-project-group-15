<template>
    <img src="../assets/background.jpeg" alt="background" width="100%" height="100%">

    <v-dialog v-model="dialog" width="auto" persistent>
        <v-card class="custom-card">
            <v-card-text style="text-align: center;">
            <img src="../assets/icon.png" alt="PriceBud" width="20%" height="20%">
            </v-card-text>

            <h1 id = "mainHead"> Welcome to the community! </h1>
            <h4 id = "subHead">  Please enter your details to sign up </h4>
        
            <v-card-text>
                <form @submit.prevent="register" class="registration-form">
                    <input
                        type="email"
                        placeholder="Email address"
                        v-model="email"
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        v-model="username"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        v-model="password"
                    />
                    <button type="submit">Register</button>
                </form>
            </v-card-text>

            <v-card-text class="rerouteLogIn"> 
                Have an account?
                <a href="/logIn1"> Login </a>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import firebase from '@/uifire.js'
import 'firebase/compat/auth';
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
        register() {
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
                // Get the user object from userCredential
                const user = userCredential.user;

                // Set the username in the user's profile
                user.updateProfile({
                    displayName: this.username
                }).then(() => {
                    // Username successfully updated
                    console.log("Username updated:", this.username);
                }).catch((error) => {
                    console.error("Error updating username:", error);
                });
                ('Successfully registered! Please login.');
                this.$router.push('/');
            })
            .catch(error => {
                alert(error.message);
            });
        },
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
  background-color: #F5F5F5;
  border-color: transparent;
  opacity: 0.97;
}
.rerouteLogIn{
    text-align: center;
}

.registration-form {
    display: flex;
    flex-direction: column;
    align-items: center;
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