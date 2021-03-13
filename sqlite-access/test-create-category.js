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

const createCategories = async() => {
  const db = await initDB('banco.sqlite3')
  await run(db, `INSERT INTO categories (id, category) VALUES (?, ?)`, [9, 'nova categoria'])
  console.log('Category created successfully!')
}

createCategories().catch(err => {
  console.log(err)
})
