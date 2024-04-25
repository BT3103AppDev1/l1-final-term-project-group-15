<template>
    <v-container>

   
      <!-- Full screen of the post -->
      <v-card class="blog-card">
        
        <!-- Return button -->
        <v-card-actions>
          <v-btn class="left-button" @click="goBack">
            <v-icon>mdi-arrow-left</v-icon>
            <span class="button-text">Back</span>
          </v-btn>
        </v-card-actions>   
  
        <!-- Profile/date -->
        <v-card-item>
          <div class="user-info">
            Posted by:
            <span class="user">{{ user }}</span>

            <span class="date">{{ date }}</span>
          </div>
          <v-spacer> </v-spacer>

          <h4>{{ product }}</h4>
        </v-card-item>
  
        <!-- Product, title, content -->
        <v-card-text>
          
          <h2>{{ title }}</h2>
          <div class="content">{{ content }}</div>
        </v-card-text>
  
        <!-- Likes, comments -->
        <v-card-item>
            <v-card-text>
                <div class="likes-comments">
                    <v-card-actions>
                    <v-btn icon="mdi-thumb-up" @click="incrementLikes" >
                        
                    </v-btn>
                    <span>{{ likes }}</span>
                    </v-card-actions>
                </div>
                <div class="likes-comments">
                    <v-icon>mdi-comment-multiple-outline</v-icon>
                    <span>{{ comments }}</span>
                </div>
            </v-card-text>
        </v-card-item>
  
        <!-- Add comment button -->
        <v-card-actions>
          <v-btn class="add-comment-button" @click="dialog = true">Add Comment</v-btn>
        </v-card-actions>
  
        <!-- Dialog for adding a comment -->
        <v-dialog v-model="dialog" width="auto">
          <v-card>
            <v-card-title class="card-title">Add Comment</v-card-title>
            <v-card-text>
              <v-textarea label="Content" v-model="cardComment"></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="commenting">Post</v-btn>
              <v-btn color="red darken-1" @click="dialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>

      <div class="spacer"></div>

      <v-card v-for="(comment, index) in commentTexts" :key="index" class="mb-4" outlined>
      <v-card-title class="title">{{ comment.user }}</v-card-title>
      <v-card-text class="content">
        <div class="info-row">
          <div class="product-info">
            <span class="product-name">{{ comment.cardComment }}</span>
          </div>
          <div class="date-info">
            <v-icon class="date-icon">mdi-calendar</v-icon>
            <span class="date">{{ comment.commentDate.toDate().toDateString() }}</span>
          </div>
        </div>
      </v-card-text>
    </v-card>


    </v-container>
  </template>

<script>
    import firebaseApp from '../firebase.js';
    import { getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, getDocs } from "firebase/firestore";


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
        commentTexts: [],
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

          const userCommentsCollection = collection(docRef, "UserComments")
          await addDoc(userCommentsCollection, {
              cardComment: this.cardComment,
              user: this.user,
              date: new Date(),
          })

          this.dialog = false
        },
        async fetchComments() {
            const blogDocRef = doc(db, 'UserInputsCommunity', this.blogId);
            const userCommentsCollection = collection(blogDocRef, "UserComments");
            const querySnapshot = await getDocs(userCommentsCollection);

            this.commentTexts = querySnapshot.docs
            .filter(doc => doc.data().user != null)
            .map(doc => ({
                user: doc.data().user,
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
.blog-card {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: lightGrey;
}
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
  font-weight: bold;
  font-size: 18px;
  color: #333;
}
.date {
  color: #999;
  font-size: 14px;
}
.content {
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.6;
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
}
.likes-comments {
  display: flex;
  align-items: center;
}
.spacer {
  margin-top: 20px; /* Adjust the value as needed */
}
.mb-4 {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
}


</style>