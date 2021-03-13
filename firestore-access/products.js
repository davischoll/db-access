const db = require('./firestore')
const admin = require('firebase-admin')

const collectionProducts = db.collection('products')

const findAll = async() => {
  const productsDB = await collectionProducts.orderBy('product').get()

  if (productsDB.empty)
    return []

  const products = []
  productsDB.forEach(doc => {
    products.push({
      ...doc.data(),
      id: doc.id
    })
  })

  const productReturn = []

  for await(product of products) {
    const imgs = []
    const imgsDB = await collectionProducts.doc(product.id).collection('images').get()

    imgsDB.forEach(img => {
      imgs.push({
        ...img.data(),
        id: img.id
      })
    })

    productReturn.push({
      ...product,
      imgs
    })
  }

  return productReturn
}

const findAllPaginated = async({ pageSize = 10, startAfter = '' }) => {
  const productsDB = await collectionProducts.orderBy('product')
                                             .limit(pageSize+1)
                                             .startAfter(startAfter)
                                             .get()

  if (productsDB.empty) {
    return {
      data: [],
      total: 0
    }
  }

  const products = []
  let total = 0
  productsDB.forEach(doc => {
    if (total < pageSize) {
      products.push({
        ...doc.data(),
        id: doc.id
      })
    }
    total++
  })

  const productReturn = []

  for await(product of products) {
    const imgs = []
    const imgsDB = await collectionProducts.doc(product.id).collection('images').get()

    imgsDB.forEach(img => {
      imgs.push({
        ...img.data(),
        id: img.id
      })
    })

    productReturn.push({
      ...product,
      imgs
    })
  }

  return {
    data: productReturn,
    total: products.length,
    hasNext: total > pageSize,
    startAfter: total > pageSize ? products[products.length-1].product : ''
  }
}

/* PRIMEIRA VERSÃO CREATE
const create = async(productName, productPrice, category) => {
  const doc = collectionProducts.doc()
  const catRef = db.collection('categories').doc(category)

  await doc.set({
    product: productName,
    price: productPrice,
    categories: [catRef],
    categories2: [category]
  })
} */

const create = async({ categories, ...data }) => {
  const doc = collectionProducts.doc()
  const categoriesRef = categories.map(cat => db.collection('categories').doc(cat))

  await doc.set({
    ...data,
    categories: categoriesRef,
    categories2: categories
  })
}

const addImg = async(id, data) => {
  const imgRef = collectionProducts.doc(id).collection('images').doc()

  await imgRef.set(data)
}

const update = async(id, { categories, ...data }) => {
  const doc = collectionProducts.doc(id)
  const categoriesRef = categories.map(cat => db.collection('categories').doc(cat))
  await doc.update({
    ...data,
    categories: admin.firestore.FieldValue.arrayUnion(...categoriesRef),
    categories2: admin.firestore.FieldValue.arrayUnion(...categories)
  })
}

const remove = async(id) => {
  const images = await collectionProducts.doc(id).collection('images').get()
  
  const exclusoes = []
  images.forEach(img => {
    exclusoes.push(collectionProducts.doc(id).collection('images').doc(img.id).delete())
  })
  await Promise.all(exclusoes)

  const doc = collectionProducts.doc(id)
  await doc.delete()
  await console.log('All products have been deleted.')
}

module.exports = {
  findAll,
  findAllPaginated,
  create,
  addImg,
  remove,
  update
}
