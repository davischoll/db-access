const categories = require('./categories')

const testCategories = async() => {
  // await categories.create([2, 'Categoria 2'])
  // await categories.create([3, 'Categoria 3'])
  // await categories.create([4, 'Categoria 4'])
  // await categories.create([5, 'Categoria 5'])

  // await categories.remove(1)

  // await categories.update(['cat atualizada', 1])

  // const selectCategorias = await categories.selectAll()
  // console.log(selectCategorias)

  console.log('cp: 0', await categories.selectAllPaginated({ pageSize: 2, currentPage: 0 }))
  console.log('cp: 1', await categories.selectAllPaginated({ pageSize: 2, currentPage: 1 }))
  console.log('cp: 2', await categories.selectAllPaginated({ pageSize: 2, currentPage: 2 }))
}

testCategories()
