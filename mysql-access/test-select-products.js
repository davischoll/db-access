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
    const [ results ] = await conn.query('SELECT * FROM products')
    console.log('Products:', results)
    }catch(err){
      console.log(err)
    }
  }catch(err){
    console.log(err)
  }
}

run()
