const db = require('./db')

const selectAll = async() => {
  const banco = await db.init('./banco.sqlite3')
  return await db.query(banco, `SELECT * FROM categories`)
}

const selectAllPaginated = async({ pageSize = 1, currentPage = 0 }) => {
  const banco = await db.init('./banco.sqlite3')
  const records = await db.query(banco, `SELECT * FROM categories LIMIT ${currentPage*pageSize}, ${pageSize+1}`)
  const hasNext = records.length > pageSize
  if (records.length > pageSize)
    records.pop()
  return {
    data: records,
    hasNext: hasNext
  }
}

const create = async(data) => {
  const banco = await db.init('./banco.sqlite3')
  await db.queryWithParams(banco, `INSERT INTO categories (id, category) VALUES (?, ?)`, data)
}

const remove = async(idCategoria) => {
  const banco = await db.init('banco.sqlite3')
  await db.queryWithParams(banco, `DELETE FROM categories WHERE id = ?`, [idCategoria])
}

const update = async(data) => {
  const banco = await db.init('banco.sqlite3')
  await db.queryWithParams(banco, `UPDATE categories SET category = ? WHERE id = ?`, data)
}

module.exports = {
  selectAll,
  selectAllPaginated,
  create,
  remove,
  update
}
