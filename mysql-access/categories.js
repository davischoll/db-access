const init = connection => {

  const create = async(data) => {
    const conn = await connection
    await conn.query(`INSERT INTO categories (category_name) VALUES (?)`, data)
  }

  const remove = async(idCategoria) => {
    const conn = await connection
    await conn.query(`DELETE FROM categories WHERE id = ? LIMIT 1;`, [idCategoria])
  }

  const update = async(nomeCategoria, idCategoria) => {
    const conn = await connection
    await conn.query(`UPDATE categories SET category_name = ? WHERE id = ?;`, [nomeCategoria, idCategoria])
  }

  const selectAll = async() => {
    const conn = await connection
    const [ result ] = await conn.query(`SELECT * FROM categories`)
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
