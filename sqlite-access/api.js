const categories = require('./categories')('./banco.sqlite3')
const products = require('./products')('./banco.sqlite3')

const testCategories = async() => {
  // await categories.create(['Categoria 1'])
  // await categories.create(['Categoria 2'])
  // await categories.create(['Categoria 3'])
  // await categories.create(['Categoria 4'])
  // await categories.create(['Categoria 5'])

  // await categories.remove(5)

  // await categories.update(['cat atualizada', 1])

  // const selectCategorias = await categories.selectAll()
  // console.log(selectCategorias)

  // console.log('cp: 0', await categories.selectAllPaginated({ pageSize: 2, currentPage: 0 }))
  // console.log('cp: 1', await categories.selectAllPaginated({ pageSize: 2, currentPage: 1 }))
  // console.log('cp: 2', await categories.selectAllPaginated({ pageSize: 2, currentPage: 2 }))

  // await products.create(3, ['Philips', 1799])

  // await products.remove(4)

  // await products.update(['Samsung 4k', 7682, 2])

  // await products.addImage(['imgSony1', 'http://www.images.com/sony1.png'], 3)

  // const selectProducts = await products.selectAll()
  // console.log(selectProducts)

  // const selectProductsPaginated = await products.selectAllPaginated({ pageSize: 2, currentPage: 1 })
  // console.log(selectProductsPaginated)

  // await products.updateCategoriesProducts(2, [1, 2, 4])

  // console.log(await products.selectAllByCategory([4]))

}

testCategories()
