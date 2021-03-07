const admin = require('firebase-admin')

const serviceAccount = require('./firestore.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

const pageSize = 1

const categories = db.collection('categories')
                     .orderBy('category')
                     .limit(pageSize+1)
                     .startAfter('Nova categoria com update')
                     .get()

categories.then(snapshot => {
  console.log('Is Empty:', snapshot.empty)
  let total = 0
  snapshot.forEach(doc => {
    if (total < pageSize) {
      console.log(doc.id, ' => ', doc.data())
    }
    total++
  })
  if (total > pageSize) {
    console.log('has Next Page')
  }else {
    console.log('Does not have Next Page')
  }
})
