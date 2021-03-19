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

  const selectAll = async() => {
    const conn = await connection
    const [ result ] = await conn.query(`SELECT * FROM products`)
    return result
  }

  return {
    create,
    remove,
    update,
    selectAll
  }

}

module.exports = init
