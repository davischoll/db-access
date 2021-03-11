const categories = require('./categories')

const testes = async() => {
  // await categories.create({
  //   category: 'Nova categoria organizada'
  // })
  // await categories.remove('Et6u1QjhxPMkHkqaStqx')
  await categories.update('3mpUvA12JbGJvRxVVHPU', {category: 'Categoria atualizada update'})
  const categorias = await categories.findAll()
  console.log(categorias)
}

testes()
