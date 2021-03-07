const admin = require('firebase-admin')

const serviceAccount = require('./firestore.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

const cat1 = '3mpUvA12JbGJvRxVVHPU'
const catRef = db.collection('categories').doc(cat1)

const productId = db.collection('products').doc('L7G7NEFwQJkzrUkYnWCo')

productId
  .update({
    product: 'Novo Produto',
    price: 1390,
    categories: admin.firestore.FieldValue.arrayUnion(catRef),
    categories2: admin.firestore.FieldValue.arrayUnion(cat1)
  })
  .then(snap => {
    console.log(snap)})
