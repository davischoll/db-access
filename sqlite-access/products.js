const db = require('./db')

const init = database => {

  const selectAll = async() => {
    const banco = await db.init(database)
  
    /* PRIMEIRA FORMA DE FAZER A BUSCA DOS PRODUTOS COM AS IMAGENS.
    return await db.query(banco, `SELECT *
                                    FROM products    p
                                    LEFT JOIN images i ON p.id = i.product_id
                                   GROUP BY i.product_id`) */

    // FORMA ALTERNATIVA, UTILIZANDO MAIS JAVASCRIPT:
    const products = await db.query(banco, `SELECT * FROM products`)
    const condition = products.map(produto => produto.id).join(',')
    const images = await db.query(banco, 'SELECT * FROM images WHERE product_id IN ('+condition+') GROUP BY product_id')
    const mapImages = images.reduce((antigo, atual) => {
      return {
        ...antigo,
        [atual.product_id]: atual
      }
    }, {})
    return products.map(product => {
      return {
        ...product,
        image: mapImages[product.id]
      }
    })
  }

  const selectAllPaginated = async({ pageSize = 1, currentPage = 0 }) => {
    const banco = await db.init(database)
    const records = await db.query(banco, `SELECT * FROM products LIMIT ${currentPage*pageSize}, ${pageSize+1}`)
    const condition = records.map(produto => produto.id).join(',')
    const images = await db.query(banco, 'SELECT * FROM images WHERE product_id IN ('+condition+') GROUP BY product_id')
    
    const mapImages = images.reduce((antigo, atual) => {
      return {
        ...antigo,
        [atual.product_id]: atual
      }
    }, {})
    
    const hasNext = records.length > pageSize
    
    if (records.length > pageSize)
      records.pop()
  
    return {
      data: records.map(product => {
        return {
          ...product,
          image: mapImages[product.id]
        }
      }),
      hasNext
    }
  }

  const create = async(idCategoria, idProduto, data) => {
    const banco = await db.init(database)
    await db.queryWithParams(banco, `INSERT INTO products (id, product, price) VALUES (?, ?, ?)`, data)
    await db.queryWithParams(banco, `INSERT INTO categories_products (category_id, product_id) VALUES (?, ?)`, [idCategoria, idProduto])
  }

  const remove = async(idProduto) => {
    const banco = await db.init(database)
    await db.queryWithParams(banco, `DELETE FROM products WHERE id = ?`, [idProduto])
    await db.queryWithParams(banco, `DELETE FROM images WHERE product_id = ?`, [idProduto])
    await db.queryWithParams(banco, `DELETE FROM categories_products WHERE product_id = ?`, [idProduto])
  }

  const update = async(data) => {
    const banco = await db.init(database)
    await db.queryWithParams(banco, `UPDATE products SET product = ?, price = ? WHERE id = ?`, data)
  }

  const addImage = async(data, idProduto) => {
    const banco = await db.init(database)
    await db.queryWithParams(banco, `INSERT INTO images (id, description, url, product_id)
                                     VALUES (?, ?, ?, ?)`, [...data, idProduto])
  }

  return {
    selectAll,
    selectAllPaginated,
    create,
    remove,
    update,
    addImage
  }
}

module.exports = init
