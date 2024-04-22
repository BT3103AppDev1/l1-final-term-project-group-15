<template>
  <v-container>
    <div id="firstContainer">
      <div>
        <h1>Master Product Data Input</h1>
        <p>Mass upload to prodcuts database</p>
      </div>
      <div>
        <v-btn class = "upload" @click="dialog = true" color="primary">Upload File</v-btn>

        <v-dialog v-model="dialog" width="auto">
          <v-card  width="400">
            <v-card-title>Upload CSV File</v-card-title>
            <v-card-text>
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

      </div>
    </div>
  </v-container>
</template>
<script setup>
import { ref } from 'vue'
import { parse } from 'papaparse';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

const dialog = ref(false)
const selectedFile = ref(null)

async function uploadFile() {
  if (!selectedFile.value) return;

  try {
    console.log(selectedFile.value[0])
    const fileData = await parseCSV(selectedFile.value[0]);
    console.log(fileData)
    await saveProductsToFirestore(fileData);
    dialog.value = false;
  } catch (error) {
    console.error('Error uploading file:', error);
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

async function saveProductsToFirestore(products) {
  const db = getFirestore();
  const productsCollection = collection(db, 'Products');

  for (const product of products) {
    const { Name: name, Category: category, Brand: brand } = product;

    try {
      // Construct document reference with document path
      const docRef = doc(productsCollection, name); // Use product name as document ID
      await setDoc(docRef, { category, brand });

      console.log(`Product "${name}" added to Firestore.`);
    } catch (error) {
      console.error(`Error adding product "${name}" to Firestore:`, error);
    }
  }
}

</script>
<style>
#firstContainer {
  display: flex;
  align-items: center;
}

#firstContainer div {
  flex: 1; /* Each div takes up an equal portion of the available space */
  padding: 0 10px; /* Optional: Add padding for spacing */
}

.upload {
  float: right;
}

</style>
