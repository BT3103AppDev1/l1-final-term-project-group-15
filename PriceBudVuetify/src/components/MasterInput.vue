<template>
  <v-container>
    <div id="firstContainer">
      <div>
        <h3>Master Product Data Input</h3>
        <p>Mass upload to product database</p>
        <p>1. Upload Products: General information for new products</p>
        <p>2. Upload Retailers: Retailer information for existing products</p>
      </div>
      <div id="buttonsContainer">
        <!-- First button for uploading of new products' general information -->
        <v-btn class = "upload" @click="dialog = true" color="rgba(105, 181, 120, 1)"  rounded='xl' style="margin-bottom: 10px; width: 18vw;" >Upload Products</v-btn>

        <v-dialog v-model="dialog" width="auto">
          <v-card  width="400">
            <v-card-title>Upload CSV Files</v-card-title>
            <v-card-text>
              <h4>For general information:</h4>
              <div id="description">
                <div>
                  <p>1. name</p>
                  <p>2. category</p>
                  <p>3. brand</p>
                </div>
                <div id="right">
                  <p>4. description</p>
                  <p>5. image path</p>
                </div>
              </div>
             
              <v-file-input
                v-model="selectedFile"
                label="Select CSV file"
                accept=".csv"
              ></v-file-input>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="dialog = false">Cancel</v-btn>
              <v-btn class = "ms-auto" color="primary" @click="uploadFile">Upload</v-btn>
            </v-card-actions>
            
          </v-card>
        </v-dialog>

        <!-- Uploading of retailer price information for existing products -->
        <v-btn class = "upload" @click="dialog2 = true" rounded='xl' color="rgba(105, 181, 120, 1)"  style="width: 18vw;" >Upload Retailers</v-btn>

        <v-dialog v-model="dialog2" width="auto">
          <v-card  width="400">
            <v-card-title>Upload CSV Files</v-card-title>
            <v-card-text>

              <!-- Select Product -->
              <h4>Select Product</h4>
              <v-autocomplete
                label="Search product"
                :items="products"
                v-model="selectedProduct"
              ></v-autocomplete>

              <!-- <h4>Select Retailer</h4>
              <v-autocomplete
                label="Search retailer"
                :items="['Lazada','Shopee','Amazon']"
                v-model="retailer"
              ></v-autocomplete> -->

              <h4>For retailer information:</h4>
              <div>
                Map: date -> price
              </div><br>
             
              <h4>Shopee:</h4>
              <v-file-input
                v-model="selectedFile2"
                label="Select CSV file"
                accept=".csv"
              ></v-file-input>

              <h4>Lazada:</h4>
              <v-file-input
                v-model="selectedFile3"
                label="Select CSV file"
                accept=".csv"
              ></v-file-input>

              <h4>Amazon:</h4>
              <v-file-input
                v-model="selectedFile4"
                label="Select CSV file"
                accept=".csv"
              ></v-file-input>             

            </v-card-text>
            <v-card-actions>
              <v-btn @click="dialog2 = false">Cancel</v-btn>
              <v-btn class = "ms-auto" color="primary" @click="uploadAll">Upload</v-btn>
            </v-card-actions>
            
          </v-card>
        </v-dialog>

      </div>
    </div>
  </v-container>
</template>
<script setup>
import { ref } from 'vue'
import { parse } from 'papaparse';
import { getFirestore, collection, doc, setDoc, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { onMounted } from 'vue';


const dialog = ref(false)
const dialog2 = ref(false)
const selectedFile = ref(null)
const selectedFile2 = ref(null)
const selectedFile3 = ref(null)
const selectedFile4 = ref(null)
const products = ref([])
const selectedProduct = ref(null)


// First set of code for dialogue
async function uploadFile() {
  if (!selectedFile.value) return;

  try {
    const fileData = await parseCSV(selectedFile.value[0]);
    await saveProductsToFirestore(fileData);
    dialog.value = false;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}
async function saveProductsToFirestore(products) {
  const db = getFirestore();
  const productsCollection = collection(db, 'Products');

  for (const product of products) {
    const { Name: name, Category: category, Brand: brand, Description: description, Image_path: image_path } = product;

    try {
      // Construct document reference with document path
      const docRef = doc(productsCollection, name); // Use product name as document ID
      await setDoc(docRef, { category, brand, description, image_path });

      const userInputsCollection = collection(docRef, "UserInputs")
      const userInputTestDoc = doc(userInputsCollection, 'TestUser')
      await setDoc(userInputTestDoc, {})

      console.log(`Product "${name}" added to Firestore.`);
    } catch (error) {
      console.error(`Error adding product "${name}" to Firestore:`, error);
    }
  }
}
async function parseCSV(file) {
  return new Promise((resolve, reject) => {
    parse(file, {
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}

async function uploadAll() {
  if (selectedFile2.value) {
    try {
      const shopeeData = await parseCSV(selectedFile2.value[0])
      await saveRetailersToFirestore(shopeeData, "Shopee")

    } catch (error) {
      console.error("Error uploading Shopee data", error)
    }
  }
  
  if (selectedFile3.value) {
    try {
      const lazadaData = await parseCSV(selectedFile3.value[0])
      await saveRetailersToFirestore(lazadaData, "Lazada")
    } catch (error) {
      console.error("Error uploading Lazada data", error)
    }
  } 

  if (selectedFile4.value) {
    try {
      const amazonData = await parseCSV(selectedFile4.value[0])
      await saveRetailersToFirestore(amazonData, "Amazon")
    } catch (error) {
      console.error("Error uploading Amazon data", error)
    }
  }   
  
  dialog2.value = false
}

 // Second dialogue functions
// async function uploadRetailer() {
//   if (!selectedFile2.value) return;
//   try {
//     const retData = await parseCSV(selectedFile2.value[0])
//     await saveRetailersToFirestore(retData)
//     dialog2.value = false
//   } catch (error) {
//     console.error('Error uploading retailer data:', error)
//   }
// }

async function saveRetailersToFirestore(rows, retString) {
  const db = getFirestore()
  const docRef = doc(db, 'Products', selectedProduct.value)
  const productDoc = await getDoc(docRef) 
  let productData = null
  

  // Checking if product is located successfully
  if (productDoc.exists()) {
    productData = productDoc.data()
  } else { return }

  if (!(retString in productData)) {
    productData[retString] = {}
  }

  // Checking for retailer in product db
  if (retString in productData) {
    const productMap = productData[retString]

    const updateObj = {};

    if (!("Highest Price" in productData)) {
      updateObj["Highest Price"] = null
      updateObj["Highest Date"] = null
      updateObj["Lowest Price"] = null
      updateObj["Lowest Date"] = null
      updateObj["Current Price"] = null
      updateObj["Current Date"] = null
      updateObj["Price Change"] = null
    } else {
      updateObj["Highest Price"] = productData["Highest Price"]
      updateObj["Highest Date"] = productData["Highest Date"]
      updateObj["Lowest Price"] = productData["Lowest Price"]
      updateObj["Lowest Date"] = productData["Lowest Date"]
      updateObj["Current Price"] = productData["Current Price"]
      updateObj["Current Date"] = productData["Current Date"]
      updateObj["Price Change"] = productData["Price Change"]
    }

    // Check date for price trend range
    // const today = new Date()
    // const year = today.getFullYear()
    // const month = String(today.getMonth() + 1).padStart(2, '0')
    // const day = String(today.getDate()).padStart(2, '0')
    // const formattedDate = `${year}${month}${day}`

    for (const row of rows) {
      const date = row.Date;
      const price = row.Price;

      if (!(date in productMap)) {
        updateObj[`${retString}.${date}`] = price
      } else if (parseInt(productMap[date]) > price) {
        updateObj[`${retString}.${date}`] = price
      } else {
        updateObj[`${retString}.${date}`] = productMap[date]
      }

      // Check for null calculated fields
      if (updateObj["Highest Price"] == null) {
        updateObj["Highest Price"] = price
        updateObj["Lowest Price"] = price
        updateObj["Current Price"] = price
        updateObj["Current Date"] = date
        updateObj["Highest Date"] = date
        updateObj["Lowest Date"] = date
        updateObj["Price Change"] = 0
      }

      // Check for highest price
      if (parseInt(updateObj["Highest Price"]) < price) {
          updateObj["Highest Price"] = price
          updateObj["Highest Date"] = date
      } 

      // Check for lowest price
      if (parseInt(updateObj["Lowest Price"]) > price) {
        updateObj["Lowest Price"] = price
        updateObj["Lowest Date"] = date
      }

      // Check for current price (newer) / (high or low if equal date)
      if (parseInt(updateObj["Current Date"]) < parseInt(date)) {
        updateObj["Price Change"] = Math.abs(parseInt(updateObj["Price Change"]) - parseInt(price)).toString()
        updateObj["Current Price"] = price
        updateObj["Current Date"] = date

      } else if (parseInt(updateObj["Current Date"]) == date) {
        if (parseInt(updateObj["Current Price"]) > price) {
          updateObj["Price Change"] = Math.abs(parseInt(updateObj["Price Change"]) - parseInt(price)).toString()
          updateObj["Current Price"] = price
          updateObj["Current Date"] = date
        }
      }
    }



    try {
      await updateDoc(docRef, updateObj);
      console.log("Retailer data updated successfully");
    } catch (error) {
      console.error("Error updating retailer data:", error);
    }



  } else {
    console.log("Retailer does not exist")
  }
}


// To get list of products for selection 
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

})

</script>
<style>
#firstContainer {
  display: flex;
  align-items: center;
}

#firstContainer div {
  flex: 1; 
}

.upload {
  float: right;
}

#description {
  display: flex;
}

#description div {
  flex: 1;
}

#buttonsContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align items to the start of the container */
}

#firstContainer div h3 {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 24px;
}

#firstContainer div p {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: rgb(91, 104, 134);
}

</style>
