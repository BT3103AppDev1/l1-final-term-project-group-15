<template>
    <v-container>

   
      <!-- Full screen of the post -->
      <v-card class="blog-card" variant="outlined">
        
        <!-- Return button -->
        <v-card-actions style="align-items: center;">
          <v-btn class="left-button" @click="goBack">
            <v-icon>mdi-arrow-left</v-icon>
            <span class="button-text">Back</span>
          </v-btn>
        </v-card-actions>   
  
        <!-- Blog title -->
        <v-card-text>
          <h2 class="blogTitle">{{ title }}</h2>
        </v-card-text>


        <!-- Profile/date -->
        <v-card-item>
          <div class="user-info">
            <span class="user">{{ user }}</span>

            <span class="date">{{ date }}</span>
          </div>
        </v-card-item>
  
        <!-- content -->
        <v-card-text>
          <div class="content">{{ content }}</div>
        </v-card-text>
        
        <!-- Review Item -->
        <v-card-text style="padding-top: 2px; padding-bottom: 2px;" >
          <p class="reviewItem">Review Item: {{ product }}</p>
        </v-card-text>
        
        <!-- Like button -->
        <v-card-actions style="align-items: center;" >
          <v-btn v-if="liked" @click="decrementLikes" icon>
            <v-icon color="blue">mdi-thumb-up</v-icon>
          </v-btn>
          <v-btn v-else icon="mdi-thumb-up" @click="incrementLikes">
          </v-btn>

          <span style="padding-right: 4vw;" >{{ likes }}</span>

          <v-icon style="padding-right: 3vw;" >mdi-comment-multiple-outline</v-icon>
          <span>{{ comments }}</span>
        </v-card-actions>
      </v-card>

      <div class="spacer"></div>

      <v-btn class="add-comment-button" @click="dialog = true">Add Comment</v-btn>
      
      <v-dialog v-model="dialog" width="auto">
        <v-card class="comment-dialog">
        <v-card-title class="card-title">Add Comment</v-card-title>
        <v-card-text>
            <v-textarea label="Content" v-model="cardComment"></v-textarea>
        </v-card-text>
        <v-card-actions>
            <v-btn class="post-btn" @click="commenting">Post</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="cancel-btn" color="red darken-1" @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>

      <div class="spacer"></div>

      <!-- Comments -->
      <v-card v-for="(comment, index) in commentTexts" :key="index" class="mb-4 custom-card" variant="elevated">
        <v-card-item style="padding: 16px;" >
          <span class="commentUser">{{ comment.commentUser }}</span><br>
          <span class="commentDate">{{ comment.commentDate.toDate().toDateString() }}</span>
        </v-card-item>
        <v-card-text class="content" style="margin-top: 0px;" >
            <div class="info-row">
            <div class="product-info">
                <span class="product-name">{{ comment.cardComment }}</span>
            </div>
            </div>
        </v-card-text>
      </v-card>


    </v-container>
  </template>

<script>
    import firebaseApp from '../firebase.js';
    import { getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, getDocs } from "firebase/firestore";
    import { getAuth } from 'firebase/auth';

    const db = getFirestore(firebaseApp);

    export default {
        
    data() {
      return {
        user: "",
        date: "",
        product: "",
        title: "",
        content: "",
        likes: "",
        comments: "",
        dialog: false,
        cardComment: "",
        commentDate: "",
        commentUser:"",
        commentTexts: [],
        liked: false
      };
    },
    props: {
        blogId: String
        
    },
    watch: {
        blogId: {
        immediate: true,
        handler: 'fetchData'
      }
    },
    methods: {
        async fetchData() {
            const docRef = doc(db, 'UserInputsCommunity', this.blogId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                this.user = data.User;
                this.date = data.Date.toDate().toDateString();
                this.product = data.Product;
                this.title = data.cardTitle;
                this.content = data.cardContent;
                this.likes = data.Likes;
                this.comments = data.Comments;
            }
        },
        goBack() {
            this.$router.go(-1)
        },
        async incrementLikes() {
            const docRef = doc(db, 'UserInputsCommunity', this.blogId);

            // Get the current likes count from the document
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                const currentLikes = data.Likes || 0; // Get current likes count or default to 0

                // Update the document with the incremented likes count
                await setDoc(docRef, { Likes: currentLikes + 1 }, { merge: true });
                this.likes = currentLikes + 1; // Update local likes count in the component
            }

            this.liked = true
        },
        async decrementLikes() {
            const docRef = doc(db, 'UserInputsCommunity', this.blogId);

            // Get the current likes count from the document
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                const currentLikes = data.Likes || 0; // Get current likes count or default to 0

                // Update the document with the incremented likes count
                await setDoc(docRef, { Likes: currentLikes - 1 }, { merge: true });
                this.likes = currentLikes - 1; // Update local likes count in the component
            }

            this.liked = false
        },
        async  commenting() {
          const docRef = doc(db, 'UserInputsCommunity', this.blogId)
          const docSnap = await getDoc(docRef);

          const data = docSnap.data();
          console.log(data);
          const currentComments = data.Comments || 0; 

          
          await updateDoc(docRef, { Comments: currentComments + 1 });
          console.log(this.comments)
          this.comments = currentComments + 1;    


          const auth = getAuth();
          const currentUser= auth.currentUser;

          const userCommentsCollection = collection(docRef, "UserComments")
          await addDoc(userCommentsCollection, {
              cardComment: this.cardComment,
              commentUser: currentUser.displayName,
              date: new Date(),
          })
          this.commentUser = currentUser.displayName;
          window.location.reload();
          this.dialog = false
        },
        async fetchComments() {
            const blogDocRef = doc(db, 'UserInputsCommunity', this.blogId);
            const userCommentsCollection = collection(blogDocRef, "UserComments");
            const querySnapshot = await getDocs(userCommentsCollection);

            this.commentTexts = querySnapshot.docs
            .filter(doc => doc.data().commentUser != null)
            .map(doc => ({
                commentUser: doc.data().commentUser,
                commentDate: doc.data().date,
                cardComment: doc.data().cardComment,
            }));
            console.log(this.commentTexts);

        }
    },
      mounted() {
        this.fetchComments();
    },
} 

</script>

<style scoped>
.left-button {
  margin-right: 10px;
}
.avatar {
  margin-right: 10px;
}
.user-info {
  display: flex;
  flex-direction: column;
  align-items: right;
}
.user {
  font-size: 16px;
  color: #333;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-style: normal;
}
.date {
  color: #999;
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.content {
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.6;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.likes-comments {
  display: inline-block;
  margin-right: 20px;
}
.add-comment-button {
    border: 1px solid #333;
}
.card-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}
.likes-comments {
  display: flex;
  align-items: center;
}
.spacer {
  margin-top: 20px; /* Adjust the value as needed */
}

.comment-dialog {
  width: 400px; /* Set the width of the dialog */
}

/* .title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
} */

.post-btn {
  color: black;
}

/* .custom-card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #F5F5F5;
} */

.button-text {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-style: normal;
  padding-left: 1vw;
}

.blogTitle {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 32px;
}

.reviewItem {
  color: #8c8b8b;
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.commentUser {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 16px;
}

.commentDate {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
}
</style>