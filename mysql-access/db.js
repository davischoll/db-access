const mysql = require('mysql2/promise')

// CONEXÃO SEM POOL:
module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'product-catalog'
})

/*  POOL DE CONEXÕES. O BANCO VAI CRIAR A QTDE DE CONEXÕES DEFINIDAS NO PARÂMETRO:
module.exports = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'product-catalog',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}) */
