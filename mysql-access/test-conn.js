const mysql = require('mysql2')

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'product-catalog'
})

conn.query('SELECT * FROM categories', (err, results, fields) => {
  console.log(err, results, fields)
})
