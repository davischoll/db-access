const admin = require('firebase-admin')

const serviceAccount = require('./firestore.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

const productId = '42isIewbETi67OZaeGnS'
const imageRef  = db.collection('products')
                    .doc(productId)
                    .collection('images')
                    .doc()

imageRef.set({
          description: 'PS-42_samsung',
          url: 'http://images.com/ps42_samsung.png'
        })
        .then(res => {
          console.log(res)
        })
