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

const run = (db, query) => new Promise((resolve, reject) => {
  db.all(query, (err, rows) => {
    if (err) {
      reject(err)
    } else {
      resolve(rows)
    }
  })
})

const selectCategories = async() => {
  const db = await initDB('banco.sqlite3')
  const categorias = await run(db, `SELECT * FROM categories`)
  console.log(categorias)
}

selectCategories().catch(err => {
  console.log(err)
})
