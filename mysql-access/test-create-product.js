const mysql = require('mysql2/promise')

const run = async() => {
  try{
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'product-catalog'
    })
    try{
    const [ results ] = await conn.query(`INSERT INTO products (product_name, price) VALUES (?, ?);`, ['ProdutoTeste5', 997])
    await conn.query(`INSERT INTO categories_products (category_id, product_id) VALUES (?, ?);`, [1, results.insertId])
    }catch(err){
      console.log(err)
    }
  }catch(err){
    console.log(err)
  }
}

run()
