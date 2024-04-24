<template>
  <v-container>
    <div id="firstContainer">
      <div>
        <h1>Community Price Input</h1>
        <p>Contribute to the community and input attractive prices that you know!</p>
      </div>
      <div id="buttonContainer">
        <v-btn class = "openDialog" @click="dialog = true" color="primary">Input Details</v-btn>

        <v-dialog v-model="dialog" width="auto">
          <v-card  width="800" height="450">
            <v-card-title>Input product details</v-card-title>
            <v-card-text>

              <!-- Select Product -->
              <!-- <h4 style="margin: 10px;">Select Product</h4> -->
              <v-autocomplete
                label="Search product"
                :items="products"
                v-model="selectedProduct"
                rounded
                variant="solo"
              ></v-autocomplete>

              <v-row>
                <v-col>
                  <v-text-field
                  v-model = "dateOfPurchase"
                  :rules = "dateRules"
                  label = "Date Of Purchase"
                  variant="solo"
                  required
                  >
                  </v-text-field>
                </v-col>

                <v-col>
                  <v-text-field
                  v-model = "retailer"
                  label = "Retailer"
                  variant="solo"
                  required
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                  v-model = "retailerLocation"
                  label = "Shop Location"
                  variant="solo"
                  required
                  >
                  </v-text-field>
                </v-col>

                <v-col>
                  <v-text-field
                  v-model = "purchasePrice"
                  label = "Purchase price"
                  variant="solo"
                  required
                  >
                  </v-text-field>
                </v-col>
              </v-row>

            </v-card-text>

            <v-card-actions>
              <v-btn @click="dialog = false">Cancel</v-btn>
              <v-btn class = "ms-auto" color="primary" @click="submit">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </div>
    </div>
  </v-container>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getFirestore, collection, getDocs, doc, addDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const dialog = ref(false)
const selectedProduct = ref(null)
const products = ref([])

const dateOfPurchase = ref(null)
const retailer = ref(null)
const retailerLocation = ref(null)
const purchasePrice = ref(null)
const userName = ref(null)
const auth = getAuth()

const dateRules = [
  (value) => {
    if (value) return true;
    return 'Date is required.'
  },
  (value) => {
    if (/^20\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/.test(value)) return true
    return 'Date must be in YYYYMMDD format and valid.'
  },
]


// To submit community prices
async function submit() {
  const db = getFirestore()
  const productsCollection = collection(db, 'Products')
  const docRef = doc(productsCollection, selectedProduct.value)

  const userInputsCollection = collection(docRef, "UserInputs")
  await addDoc(userInputsCollection, {
    Date: dateOfPurchase.value,
    Location: retailerLocation.value,
    Retailer: retailer.value,
    Price: purchasePrice.value,
    User: userName.value
  })

  console.log(userName.value)
  dialog.value = false
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

})
</script>
<style>
#buttonContainer {
  display: flex;
  flex-direction: column;
}

#firstContainer {
  display: flex;
  align-items: center;
}
</style>