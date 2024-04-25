<template>
    <v-container>
      <v-row class="mb-4"> <!-- Add margin-bottom class -->

        <!-- Sort Options Button -->
        <v-col>
          <v-menu offset-y>
            <!-- Activator Button -->
            <template v-slot:activator="{ props }">
              <v-btn rounded="lg" v-bind="props" variant="outlined">
                <p>Sort Options</p> <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>
  
            <!-- Menu Items -->
            <v-list>
              <v-list-item @click="sortBy('popular')"><p class="menuText">Most Popular</p></v-list-item>
              <v-list-item @click="sortBy('commented')"><p class="menuText">Most Commented</p></v-list-item>
              <v-list-item @click="sortBy('recent')"><p class="menuText">Most Recent</p></v-list-item>    
            </v-list>
          </v-menu>
        </v-col>

        <v-col class="text-right"> <!-- Aligns the button to the right -->
          <v-btn @click="dialog = true"  variant="outlined" rounded="lg" color="green"> <p>create </p><v-icon color="green">mdi-plus</v-icon> </v-btn>
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
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" @click="dialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
      </v-row>

      <v-card v-for="(card, index) in cards" :key="index" class="mb-4" 
        @mouseenter="hoveredCard = index" 
        @mouseleave="hoveredCard = null"
        :style="{ cursor: hoveredCard === index ? 'pointer' : 'pointer' }"
        variant="elevated"
        rounded="lg"
      
        > <!-- Set variant to "text" -->
      
        <v-card-title class="title" @click="select(card)"><p style="padding: 8px; padding-bottom: 0px" >{{ card.title }}</p></v-card-title>
        <v-card-text class="thing" @click="select(card)">
          <div style="padding-left: 8px;" class="cardInfo">
            <div class="info-row">
            <div class="user-info">
                <v-icon class="user-icon">mdi-account</v-icon>
                <span class="user-name">{{ card.user }}</span>
            </div>
            <div class="product-info">
                <v-icon class="product-icon">mdi-tag</v-icon>
                <span class="product-name">{{ card.product }}</span>
            </div>
            <div class="date-info">
                <v-icon class="date-icon">mdi-calendar</v-icon>
                <span class="date">{{ card.date.toLocaleDateString() }}</span>
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
            <div class="card-content">{{ truncatedContent(card.content) }}</div>
          </div>
        </v-card-text>
</v-card>

    </v-container>
  </template>
  

<script>
import { ref, onMounted } from 'vue'
import { getFirestore, collection, getDocs, doc, addDoc, setDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  methods: {
    sortBy(option) {
        switch (option) {
            case 'popular':
            // Sort posts by the number of likes (from largest to smallest)
            this.cards.sort((a, b) => b.likes - a.likes);
            break;
            case 'commented':
            // Sort posts by the number of comments (from largest to smallest)
            this.cards.sort((a, b) => b.comments - a.comments);
            break;
            case 'recent':
            // Sort posts by date (from most recent to oldest)
            this.cards.sort((a, b) => b.date- a.date);
            break;
            default:
            break;
        }
    },
    select(card) {
      console.log(card.id)
      this.$router.push({ name: 'CommunityToBlog', params: { id: card.id } })
    },
    truncatedContent(content) {
      if (!content) return ''; // Return an empty string if content is undefined
      
      const words = content.split(' '); // Split content into words
      let truncatedWords = words.slice(0, 20); // Take the first 20 words

      if (words.length > 20) {
        truncatedWords.push("..."); // Add ellipsis if there are more than 20 words
      }
      return truncatedWords.join(' '); // Join the truncated words back into a string
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
        window.location.reload();
        //still have to display 
    }

    async function fetchPosts() {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "UserInputsCommunity"));
    cards.value = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const dateData = doc.data().Date
        console.log("Raw Date Data:", dateData); // Log the raw date data
        const formatted = dateData.toDate()
        console.log(formatted)
        return {
            title: data.cardTitle,
            content: data.cardContent,
            user: data.User,
            product: data.Product,
            date: formatted, // Convert Firestore Timestamp to JavaScript Date
            likes: data.Likes,
            comments: data.Comments,
            id: doc.id
        };
    });
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

.thing {
  display: flex;
  flex-direction: column;
}

.info-row {
  display: flex;
  flex-wrap: wrap;
}

.user-info, .date-info, .likes-info, .comments-info, .product-info{
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.user-icon, .date-icon, .likes-icon, .comments-icon,.product-icon {
  margin-right: 5px;
  font-size: 16px;
}

.user-name, .date, .likes, .comments, .product {
  font-size: 14px;
}

.card-content {
  margin-top: 10px;
  font-size: 16px;
  color: #555;
}

p {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-style: normal;
}

.menuText {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.cardInfo > * {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
}
</style>
