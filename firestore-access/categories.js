const db = require('./firestore')

const findAll = async() => {
  const categoriesDB = await db.collection('categories').get()

  if (categoriesDB.empty) {
    return []
  }
  const categories = []
  categoriesDB.forEach(doc => {
    categories.push({
      ...doc.data(),
      id: doc.id
    })
  })

  return categories
}

const create = async(nomeCategoria) => {
  const collectionCategories = db.collection('categories').doc()
  await collectionCategories.set(nomeCategoria)
}

const remove = async(id) => {
  const doc = db.collection('categories').doc(id)
  await doc.delete()
}

const update = async(id, nomeCategoria) => {
  const collectionCategories = db.collection('categories').doc(id)
  await collectionCategories.update(nomeCategoria)
}

module.exports = {
  findAll,
  create,
  remove,
  update
}
