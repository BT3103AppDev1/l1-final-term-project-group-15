<template>
  <v-container class="container">
    <div class="flex-container">
      <div class="info">
        <div class="pic">
          <v-avatar size="100">
            <img class="avatar" :src="profilePic" alt="Profile Picture">
          </v-avatar>
          <v-file-input hide-input @change="onFileSelected"></v-file-input>
        </div>
        <div class="name">
          <h2>{{ userName }}</h2>
        </div>
        <div>
          <p>Joined on {{ joinDate }}</p>
        </div>
      </div>
      <div class="text-end">
        <v-btn color="primary" small rounded>Edit Profile</v-btn>
      </div>
    </div>
  </v-container>
</template>
  
  <script>
  import { getFirestore, doc, getDoc, updateDoc} from 'firebase/firestore';
  import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
  
  export default {
    data() {
      return {
        userName: '',
        joinDate: '20 May 2024',
        profilePic: '',
      }
    },
    props: {
      userEmail: String
    },
    watch: {
      userEmail: {
        immediate: true,
        handler: 'fetchProfilePic'
      }
    },
    methods: {
      async onFileSelected(event) {
        const db = getFirestore();
        const storage = getStorage();
        const file = event.target.files[0];
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on('state_changed', 
          (snapshot) => {
            // Handle the upload task progress
          }, 
          (error) => {
            // Handle unsuccessful uploads
          }, 
          async () => {
            const fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
            this.profilePic = fileUrl;
            const userRef = doc(db, 'Users', this.userEmail);
            await updateDoc(userRef, { Picture: fileUrl });
          }
        );
      },
      async fetchProfilePic() {
        const db = getFirestore();
        const userRef = doc(db, 'Users', this.userEmail);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          this.profilePic = docSnap.data().Picture;
          this.userName = docSnap.data().Name;
        }
      }
    },
  }
  </script>

  <style scoped>
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
  }
  .name {
    padding-left: 0;
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
  </style>