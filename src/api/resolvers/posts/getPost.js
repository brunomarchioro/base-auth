import SQL from "sql-template-strings"

export default async function getPost(_parent, { id }, { db }) {
  try {
    console.log("fetch post", id)
    return db.get(SQL`SELECT * FROM posts WHERE id = ${id}`)
  } catch (error) {
    console.error(error)
  }
}
