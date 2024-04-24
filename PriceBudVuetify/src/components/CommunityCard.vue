<template>
    <v-container >

        <div>
            <h2 class="title">Our Community Page</h2>
            <h5 class="subtitle">see what others are reviewing about </h5>
        </div>

      <v-row class="mb-4"> <!-- Add margin-bottom class -->
        <v-col>
          <v-menu offset-y>
            <!-- Activator Button -->
            <template v-slot:activator="{ props }">
              <v-btn color="primary" dark v-bind="props">
                Sort Options <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>
  
            <!-- Menu Items -->
            <v-list>
              <v-list-item @click="sortBy('popular')">Most Popular </v-list-item>
              <v-list-item @click="sortBy('commented')">Most Commented</v-list-item>
              <v-list-item @click="sortBy('recent')">Most Recent</v-list-item>            </v-list>
          </v-menu>
        </v-col>

        <v-col class="text-right"> <!-- Aligns the button to the right -->
          <v-btn @click="dialog = true"> create <v-icon>mdi-plus</v-icon> </v-btn>
        </v-col>

        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-card-title class ="cardTitle">Create a post</v-card-title>
                <v-card-text>
                    <!-- Form or content for adding a new card goes here -->
                    <v-autocomplete
                        label="Search product"
                        :items="products"
                        v-model="selectedProduct"
                        rounded
                        variant="solo"
                    ></v-autocomplete>
                    <v-text-field label="Title" v-model="cardTitle"></v-text-field>
                    <v-textarea label="Content" v-model="cardContent"></v-textarea>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="post">Post</v-btn>
                    <v-btn color="red darken-1" @click="dialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
      </v-row>
  
      <v-card v-for="(card, index) in cards" :key="index" class="mb-4" outlined>
    <v-card-title class="title">{{ card.title }}</v-card-title>
    <v-card-text class="content">
      <div class="info-row">
        <div class="user-info">
          <v-icon class="user-icon">mdi-account</v-icon>
          <span class="user-name">{{ card.user }}</span>
        </div>
        <div class="date-info">
          <v-icon class="date-icon">mdi-calendar</v-icon>
          <span class="date">{{ card.date }}</span>
        </div>
        <div class="likes-info">
          <v-icon class="likes-icon">mdi-thumb-up</v-icon>
          <span class="likes">{{ card.likes }}</span>
        </div>
        <div class="comments-info">
          <v-icon class="comments-icon">mdi-comment-multiple-outline</v-icon>
          <span class="comments">{{ card.comments }}</span>
        </div>
      </div>
      <div class="card-content">{{ card.content }}</div>
    </v-card-text>
  </v-card>
    </v-container>
  </template>
  

<script>
import { ref, onMounted } from 'vue'
import { getFirestore, collection, getDocs, doc, addDoc, setDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  data() {
    return {

    };
  },
  methods: {
    sortBy(option) {
      // Handle sorting logic based on the selected option
      switch (option) {
        case 'popular':
          // Sort from largest to smallest
          break;
        case 'commented':
          // Sort from smallest to largest
          break;
        case 'recent':
          // Sort by most recent
          break;
        default:
          break;
      }
    }
  },
  setup() {
    const dialog = ref(false);
    const selectedProduct = ref(null)
    const products = ref([])
    const cards = ref([]);

    const cardTitle = ref(null)
    const cardContent = ref(null)
    const userName = ref(null)
    const auth = getAuth()

    async function post() {
        const db = getFirestore()
        const userInputsCollection = collection(db, "UserInputsCommunity")

        const blogPage = await addDoc(userInputsCollection, {
            cardTitle: cardTitle.value,
            cardContent: cardContent.value,
            User: userName.value,
            Product: selectedProduct.value,
            Date: new Date(),
            Likes: 0,
            Comments: 0,
        })

        const userCommentsCollection = collection(blogPage, "UserComments")
        const commentInputDummy = doc(userCommentsCollection, "DummyComment") 
        await setDoc(commentInputDummy, {})
        console.log(userName.value)
        dialog.value = false

        //still have to display 
    }

    async function fetchPosts() {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "UserInputsCommunity"));
        cards.value = querySnapshot.docs.map(doc => ({
            title: doc.data().cardTitle,
            content: doc.data().cardContent,
            user: doc.data().User,
            product: doc.data().Product,
            date: doc.data().Date.toDate().toDateString(), // Assuming Date is stored as Firestore Timestamp
            likes: doc.data().Likes,
            comments: doc.data().comments,
        }));
        console.log(cards)
    }

    onMounted(async () => {
        try {
            const db = getFirestore()
            const querySnapshot = await getDocs(collection(db, "Products"))
            for (const doc of querySnapshot.docs) {
            products.value.push(doc.id)
            }
        } catch (error) {
            console.error('Error fetching products:', error)
        }

        onAuthStateChanged(auth, (user) => {
            if (user) {
            userName.value = user.displayName
            }
        })

        fetchPosts(); 

    })

    return { dialog, selectedProduct, products, cardTitle, cardContent, post, cards };  }
};
</script>

<style scoped>
.text-right {
  text-align: right; /* Aligns the button to the right */
}
.subtitle {
  font-weight: 400;
  font-family: 'poppins';
  color: grey;
}
.title {
  font-family: 'poppins';
  font-weight: bold;
}
.cardTitle{
    text-align: center;
}

.title {
  font-weight: bold;
  font-size: 20px;
  color: #333;
}

.content {
  display: flex;
  flex-direction: column;
}

.info-row {
  display: flex;
  flex-wrap: wrap;
}

.user-info, .date-info, .likes-info, .comments-info {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.user-icon, .date-icon, .likes-icon, .comments-icon {
  margin-right: 5px;
  font-size: 16px;
}

.user-name, .date, .likes, .comments {
  font-size: 14px;
}

.card-content {
  margin-top: 10px;
  font-size: 16px;
  color: #555;
}
</style>