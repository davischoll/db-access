const categories = require('./categories')
const products = require('./products')

const testeApiCategorias = async() => {
  // await categories.create({
  //   category: 'Shablau'
  // })

  // await categories.remove('4Ehvojx9wTtNkOSNOhaT')

  // await categories.update('3wRTq9D1urdGU3oCVnJZ', {category: 'Computers'})

  const categoriasTodas = await categories.findAll()
  console.log('Todas ===>>', categoriasTodas)

  const categorias = await categories.findAllPaginated({ pageSize: 2, startAfter: '' })
  console.log('Paginadas ===>>', categorias)
}

const testeApiProducts = async() => {
  // const produtosTodos = await products.findAll()
  // console.log(produtosTodos)
  
  const buscaProdutosPaginados = await products.findAllPaginated({ pageSize: 1, startAfter: '' })
  console.log(buscaProdutosPaginados)

  // await products.create({
  //   product: 'Bacia',
  //   price: 13,
  //   categories: ['MOa7Bk8mvxAnyUMFDldW']
  // })

  // await products.update('IW9YK6zV18Iyyvwyjhwk', {
  //   product: 'Caneca',
  //   price: 15,
  //   categories: ['3mpUvA12JbGJvRxVVHPU']
  // })

  // await products.remove('L7G7NEFwQJkzrUkYnWCo')

  // await products.addImg('Uv0behrDVkpCQ7OMk947', { description: 'new image', url: 'url'})
}

testeApiProducts()
