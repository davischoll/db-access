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
    const [ results ] = await conn.query(`UPDATE products SET product_name = ?, price = ? WHERE id = ?;`, ['Produto4', 345, 4])
    console.log(results)
    }catch(err){
      console.log(err)
    }
  }catch(err){
    console.log(err)
  }
}

run()
