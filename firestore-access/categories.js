const db = require('./firestore')

const collectionCategories = db.collection('categories')

const findAll = async() => {
  const categoriesDB = await collectionCategories.orderBy('category').get()

  if (categoriesDB.empty)
    return []

  const categories = []
  categoriesDB.forEach(doc => {
    categories.push({
      categoria: doc.data().category,
      id: doc.id
    })
  })

  return categories
}

const findAllPaginated = async({ pageSize = 10, startAfter = '' }) => {
  const categoriesDB = await collectionCategories.orderBy('category')
                                                 .limit(pageSize+1)
                                                 .startAfter(startAfter)
                                                 .get()

  if (categoriesDB.empty) {
    return {
      data: [],
      total: 0
    }
  }

  const categories = []
  let total = 0
  categoriesDB.forEach(doc => {
    if (total < pageSize) {
      categories.push({
        ...doc.data(),
        id: doc.id
      })
    }
    total++
  })

  return {
    data: categories,
    total: categories.length,
    hasNext: total > pageSize,
    startAfter: total > pageSize ? categories[categories.length-1].category : ''
  }
}

const create = async(nomeCategoria) => {
  const doc = collectionCategories.doc()
  await doc.set(nomeCategoria)
}

const remove = async(id) => {
  const doc = collectionCategories.doc(id)
  await doc.delete()
}

const update = async(id, nomeCategoria) => {
  const doc = collectionCategories.doc(id)
  await doc.update(nomeCategoria)
}

module.exports = {
  findAll,
  findAllPaginated,
  create,
  remove,
  update
}
