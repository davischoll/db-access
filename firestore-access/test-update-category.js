const admin = require('firebase-admin')

const serviceAccount = require('./firestore.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

const collectionCategories = db.collection('categories').doc('3mpUvA12JbGJvRxVVHPU')

collectionCategories
  .update({
    category: 'Nova categoria com update'})
  .then(snap => {
    console.log(snap)})
