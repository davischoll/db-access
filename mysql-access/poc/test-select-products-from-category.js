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
    const [ results ] = await conn.query(`SELECT *
                                            FROM products p
                                            LEFT JOIN categories_products cp ON cp.product_id = p.id
                                           WHERE cp.category_id = ${idCategoria};`)
    console.log('Products:', results)
    }catch(err){
      console.log(err)
    }
  }catch(err){
    console.log(err)
  }
}

run()
