const categories = require('./categories')('./banco.sqlite3')
const products = require('./products')('./banco.sqlite3')

const testCategories = async() => {
  // await categories.create([2, 'Categoria 2'])
  // await categories.create([3, 'Categoria 3'])
  // await categories.create([4, 'Categoria 4'])
  // await categories.create([5, 'Categoria 5'])

  // await categories.remove(1)

  // await categories.update(['cat atualizada', 1])

  // const selectCategorias = await categories.selectAll()
  // console.log(selectCategorias)

  // console.log('cp: 0', await categories.selectAllPaginated({ pageSize: 2, currentPage: 0 }))
  // console.log('cp: 1', await categories.selectAllPaginated({ pageSize: 2, currentPage: 1 }))
  // console.log('cp: 2', await categories.selectAllPaginated({ pageSize: 2, currentPage: 2 }))

  // await products.create(7, 3, [3, 'Philco', 234])

  // await products.remove(3)

  // await products.update(['Philips', 455, 3])

  // await products.addImage([3, 'Samsung2', 'http://www.images.com/samsung2.png'], 2)

  // const selectProducts = await products.selectAll()
  // console.log(selectProducts)

  // const selectProductsPaginated = await products.selectAllPaginated({ pageSize: 2, currentPage: 0 })
  // console.log(selectProductsPaginated)

  // await products.updateCategoriesProducts(1, [2])

  console.log(await products.selectAllByCategory([7]))

}

testCategories()
