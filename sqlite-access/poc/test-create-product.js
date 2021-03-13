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

const createProducts = async() => {
  const db = await initDB('banco.sqlite3')
  await run(db, `INSERT INTO products (id, product, price) VALUES (?, ?, ?)`, [2, 'Samsung Bla', 2397])
  await run(db, `INSERT INTO categories_products (category_id, product_id) VALUES (?, ?)`, [7, 2])
  console.log('Products created successfully!')
}

createProducts().catch(err => {
  console.log(err)
})
