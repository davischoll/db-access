const categories = require('./categories')

const testes = async() => {
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

testes()
