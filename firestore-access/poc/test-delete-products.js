const admin = require('firebase-admin')

const serviceAccount = require('./firestore.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

const productId = '42isIewbETi67OZaeGnS'

const productRef = db.collection('products').doc(productId)

productRef.collection('images').get().then(imgSnapshot => {
  const exclusoes = []
  imgSnapshot.forEach(img => {
    exclusoes.push(productRef.collection('images').doc(img.id).delete())
  })
  return Promise.all(exclusoes)
})
.then(() => {
  return productRef.delete()
})
.then(() => {
  console.log('All products have been deleted.')
})
