const admin = require('firebase-admin')

const serviceAccount = require('../firestore.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

// ------------------------------

const collectionCategories = db.collection('categories').doc()

collectionCategories
  .set({
    category: 'Nova categoria'})
  .then(snap => {
    console.log(snap)})
