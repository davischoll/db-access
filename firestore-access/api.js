const categories = require('./categories')

const testes = async() => {
  // await categories.create({
  //   category: 'Nova categoria organizada'
  // })

  // await categories.remove('Et6u1QjhxPMkHkqaStqx')

  // await categories.update('3mpUvA12JbGJvRxVVHPU', {category: 'Categoria atualizada update'})

  // const categorias = await categories.findAll()

  const categorias = await categories.findAllPaginated({ pageSize: 1, startAfter: 'Categoria atualizada update' })
  console.log(categorias)
}

testes()
