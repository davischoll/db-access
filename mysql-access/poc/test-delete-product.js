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
      const [ results ] = await conn.query(`DELETE FROM products WHERE id = ? LIMIT 1`, [8])
      console.log(results)
    }catch(err){
      console.log(err)
    }
  }catch(err){
    console.log(err)
  }
}

run()
