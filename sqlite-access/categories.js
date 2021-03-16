const db = require('./db')

const init = database => {

  const selectAll = async() => {
    const banco = await db.init(database)
    return await db.query(banco, `SELECT * FROM categories`)
  }

  const selectAllPaginated = async({ pageSize = 1, currentPage = 0 }) => {
    const banco = await db.init(database)
    const records = await db.query(banco, `SELECT * FROM categories LIMIT ${currentPage*pageSize}, ${pageSize+1}`)
    const hasNext = records.length > pageSize
    if (records.length > pageSize)
      records.pop()
    return {
      data: records,
      hasNext
    }
  }

  const create = async(data) => {
    const banco = await db.init(database)
    await db.queryWithParams(banco, `INSERT INTO categories (category) VALUES (?)`, data)
  }

  const remove = async(idCategoria) => {
    const banco = await db.init(database)
    await db.queryWithParams(banco, `DELETE FROM categories WHERE id = ?`, [idCategoria])
  }

  const update = async(data) => {
    const banco = await db.init(database)
    await db.queryWithParams(banco, `UPDATE categories SET category = ? WHERE id = ?`, data)
  }

  return {
    selectAll,
    selectAllPaginated,
    create,
    remove,
    update
  }
}

module.exports = init
