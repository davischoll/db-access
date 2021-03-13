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

const deleteProducts = async() => {
  const db = await initDB('banco.sqlite3')
  await run(db, `DELETE FROM categories_products WHERE product_id = ?`, [1])
  await run(db, `DELETE FROM products WHERE id = ?`, [1])
  console.log('Product deleted successfully!')
}

deleteProducts().catch(err => {
  console.log(err)
})
