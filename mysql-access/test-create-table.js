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
      const [results] = await conn.query(`SHOW TABLES LIKE 'categories'`)
      if(results.length === 0){
        await conn.query(`
          CREATE TABLE categories (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            category VARCHAR(250) NOT NULL
          )
        `)
      }
    }catch(err){
      console.log(err)
    }
  }catch(err){
    console.log(err)
  }
}

run()
