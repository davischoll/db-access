const admin = require('firebase-admin')

const serviceAccount = require('./firestore.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

const cat1 = 'MOa7Bk8mvxAnyUMFDldW'
const catRef = db.collection('categories').doc(cat1)

const collectionProducts = db.collection('products').doc()

collectionProducts
  .set({
    product: 'PS-4 Game',
    price: 1490,
    categories: [catRef],
    categories2: [cat1]
  })
  .then(snap => {
    console.log(snap)})
