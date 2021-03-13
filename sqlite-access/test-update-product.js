const sqlite = require('sqlite3').verbose()

const initDB = databaseFile => new Promise((resolve, reject) => {
  const db = new sqlite.Database('banco.sqlite3', (err) => {
    if (err) {
      reject(err)
    } else {
      resolve(db)
    }
  })
})

const run = (db, query, values) => new Promise((resolve, reject) => {
  db.run(query, values, err => {
    if (err) {
      reject(err)
    } else {
      resolve()
    }
  })
})

const updateProducts = async() => {
  const db = await initDB('banco.sqlite3')
  await run(db, `UPDATE products SET product = ?, price = ? WHERE id = ?`, ['Samsung Bla', 2299, 1])
  // OBS: Para atualizar a tabela de ligação, pode-se apagar tudo de categories_products e adicionar o que ficou
  //      Ou remover/adicionar somente o que foi removido/adicionado.
  console.log('Product updated successfully!')
}

updateProducts().catch(err => {
  console.log(err)
})
