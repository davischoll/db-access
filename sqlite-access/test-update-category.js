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

const updateCategories = async() => {
  const db = await initDB('banco.sqlite3')
  await run(db, `UPDATE categories SET category = ? WHERE id = ?`, ['cat atualizada', 9])
  console.log('Category updated successfully!')
}

updateCategories().catch(err => {
  console.log(err)
})
