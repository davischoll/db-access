const init = connection => {

  const create = async(idCategoria, data) => {
    const conn = await connection
    const [ result ] = await conn.query(`INSERT INTO products (product_name, price) VALUES (?, ?);`, data)
    await conn.query(`INSERT INTO categories_products (category_id, product_id) VALUES (?, ?);`, [idCategoria, result.insertId])
  }

  const remove = async(idProduto) => {
    const conn = await connection
    await conn.query(`DELETE FROM products WHERE id = ? LIMIT 1;`, [idProduto])
  }

  const update = async(nomeProduto, price, idProduto) => {
    const conn = await connection
    await conn.query(`UPDATE products SET product_name = ?, price = ? WHERE id = ?;`, [nomeProduto, price, idProduto])
  }

  const updateCategories = async(idProduto, idsCategorias) => {
    const conn = await connection
    await conn.query('START TRANSACTION')
    await conn.query('DELETE FROM categories_products WHERE product_id = ?;', [idProduto])
    for await (const categoryId of idsCategorias) {
      await conn.query('INSERT INTO categories_products (category_id, product_id) VALUES (?, ?);', [categoryId, idProduto])
    }
    await conn.query('COMMIT');
  }

  const findImages = async(result) => {
    const conn = await connection
    const productIds = result.map(res => res.id).join(',')

    const [ images ] = await conn.query(`SELECT * FROM images WHERE product_id IN (${productIds});`)

    const mapImages = images.reduce((anterior, atual) => {
      return {
        ...anterior,
        [atual.product_id]: atual
      }
    }, {})

    return result.map(produto => {
      return {
        ...produto,
        image: mapImages[produto.id]
      }
    })
  }

  const selectAll = async() => {
    const conn = await connection
    const [ result ] = await conn.query(`SELECT * FROM products`)

    return findImages(result)
  }

  const selectAllByCategory = async(idCategoria) => {
    const conn = await connection
    const [ result ] = await conn.query(`SELECT *
                                           FROM products
                                          WHERE id IN (SELECT product_id
                                                         FROM categories_products
                                                        WHERE category_id = ${idCategoria});`)

    return findImages(result)
  }

  const selectAllPaginated = async({ pageSize = 10, currentPage = 0 } = {}) => {
    const conn = await connection
    const [ result ] = await conn.query(`SELECT * FROM products LIMIT ${currentPage*pageSize}, ${pageSize+1}`)

    const hasNext = result.length > pageSize
    
    if (result.length > pageSize)
      result.pop()
    
    const productWithImages = await findImages(result)

    return {
      data: productWithImages,
      hasNext
    }
  }

  const addImage = async(data, idProduto) => {
    const conn = await connection
    await conn.query(`INSERT INTO images (description, url, product_id) VALUES (?, ?, ?);`, [...data, idProduto])
  }

  return {
    create,
    remove,
    update,
    updateCategories,
    selectAll,
    selectAllByCategory,
    selectAllPaginated,
    addImage
  }

}

module.exports = init
