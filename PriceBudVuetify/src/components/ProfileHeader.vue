<template>
  <v-container class="container">
    <div class="flex-container">
      <div class="info">
        <div class="pic">
          <v-avatar size="100">
            <img class="avatar" :src="profilePic" >
          </v-avatar>
          <input type="file" ref="file" style="display: none" @change="onFileSelected"></input>
        </div>
        <v-container class="name">
          <h1>{{ userName }}</h1>
          <v-btn class = "button" variant = "text" small color="primary" @click="$refs.file.click()"><strong>Upload Profile Picture</strong></v-btn>
        </v-container>
      </div>
      <div class="text-end">
        <v-btn v-if="isEditing" color="success" small rounded @click="toggleEdit">Save Changes</v-btn>
        <v-btn v-else color="primary" small rounded @click = "toggleEdit()">Edit Profile</v-btn>
      </div>
    </div>

    <div>
            <v-card class = "card1">
                <v-card-title>Preferences</v-card-title>
                <v-card-text class = "text1">
                  <v-textarea v-if = "isEditing" v-model="preferences"></v-textarea>
                  <p v-else>{{ preferences }}</p>
                </v-card-text>
            </v-card>
          </div>
        <div>
            <v-card class = "card2">
                <v-card-title>Biography</v-card-title>
                <v-card-text>
                  <v-textarea v-if = "isEditing" v-model="biography"></v-textarea>
                  <p v-else>{{ biography }}</p>
                </v-card-text>
            </v-card>
          </div>
        <div>
            <v-card class = "card3">
                <v-card-title>Contact</v-card-title>
                <v-card-text>
                  <v-textarea v-if = "isEditing" v-model="contact"></v-textarea>
                  <p v-else>{{ contact }}</p>
                </v-card-text>
            </v-card>
          </div>
  </v-container>
</template>
  
  <script>
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import DefaultProfilePic from "../assets/DefaultProfilePic.png"
  
  export default {
    data() {
      return {
        isEditing: false,
        profilePic: DefaultProfilePic,
        preferences: '',
        biography: '',
        contact: '',
      }
    },
    props: {
      userEmail: String,
      userName: String
    },
    watch: {
      userEmail: {
        immediate: true,
        handler() {this.fetchProfileInfo()}
      }
    },
    methods: {
      toggleEdit() {
      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        this.editProfile();
      }
    },
    async onFileSelected(event) {
      const file = event.target.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, `profilePics/${this.userEmail}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.then(async () => {
        const url = await getDownloadURL(storageRef);
        this.profilePic = url;

        const db = getFirestore();
        const userRef = doc(db, 'Users', this.userEmail);
        await setDoc(userRef, { Picture: url });
      });
    },
    async fetchProfileInfo() {
      const db = getFirestore();
      const userRef = doc(db, 'Users', this.userEmail);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        this.profilePic = userSnap.data().Picture;
        this.preferences = userSnap.data().Preferences;
        this.biography = userSnap.data().Biography;
        this.contact = userSnap.data().Contact;
      }
    },
    async editProfile() {
      const db = getFirestore();
      const userRef = doc(db, 'Users', this.userEmail);

      if (this.preferences === undefined) {
        this.preferences = '';
      }
      if (this.biography === undefined) {
        this.biography = '';
      }
      if (this.contact=== undefined) {
      this.contact = '';
      }
      await setDoc(userRef, {
      Preferences: this.preferences,
      Biography: this.biography,
      Contact: this.contact
    },{ merge: true });
  },
  },
};
  </script>

  <style scoped>

.card1 {
    border: none !important;
    box-shadow: none;
    padding-top: 3vh;
}

.card2 {
    border: none !important;
    box-shadow: none;
}

.card3 {
    border: none !important;
    box-shadow: none;
}
  .button {
    text-transform: none;
  }
  .info {
  display: flex;
  align-items: center;
  gap: 20px;
}
  .flex-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
    .pic {
    padding-right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .name {
    padding-left: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  
  .avatar {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
  .container {
    /* Add your custom styles here */
    font-family: 'Poppins';
    padding-bottom: 0;
    margin-bottom: 0;
    margin: 0%;
    height: fit-content;
  }
  .text-end {
    margin-right: 40px;
  }
  </style>