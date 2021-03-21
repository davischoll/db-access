const db = require('./db')
const categories = require('./categories')(db)
const products = require('./products')(db)

// const products = require('./products')('./banco.sqlite3')

const test = async() => {
  // await categories.create(['Categoria Nova API'])
  // await categories.create(['Categoria 2'])

  // await categories.remove(7)

  // await categories.update('Quatro', 4)

  // const categoriasTodas = await categories.selectAll()
  // console.log(categoriasTodas)

  // console.log('cp: 0', await categories.selectAllPaginated({ pageSize: 2, currentPage: 0 }))
  // console.log('cp: 1', await categories.selectAllPaginated({ pageSize: 2, currentPage: 1 }))
  // console.log('cp: 2', await categories.selectAllPaginated({ pageSize: 2, currentPage: 2 }))

  // await products.create(5, ['Outro', 99])

  // await products.remove(12)

  // await products.update('Samsung 4k', 7682, 10)
  
  // await products.addImage(['bike2', 'http://www.images.com/bike2.png'], 7)

  // const selectProducts = await products.selectAllByCategory(1)
  // console.log(selectProducts)

  // const selectProductsPaginated = await products.selectAllPaginated()
  // console.log(selectProductsPaginated)

  // await products.updateCategories(9, [8])

  /* CÓDIGO PARA TESTAR O LIMITE DE CONEXÕE DO POOL DE CONEXÕES DO BANCO:
  for (let i = 0; i < 1000; i++){
    products.selectAllByCategory(1).then(prods => console.log(prods))
  } */

}

test()
