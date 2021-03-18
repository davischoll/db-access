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
            category_name VARCHAR(250) NOT NULL
          );
        `)
        await conn.query(`
          CREATE TABLE products (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            product_name VARCHAR(250) NOT NULL,
            price FLOAT
          );
        `)
        await conn.query(`
          CREATE TABLE images (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            description TEXT,
            url VARCHAR(500),
            product_id INT NOT NULL,
            KEY fk_images_products_index (product_id),
            CONSTRAINT fk_images_products_constraint FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
          );
        `)
        await conn.query(`
          CREATE TABLE categories_products (
            category_id INT NOT NULL,
            product_id INT NOT NULL,
            KEY fk_categories_products_index (category_id, product_id),
            CONSTRAINT fk_categories_products_constraint1 FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT fk_categories_products_constraint2 FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
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
