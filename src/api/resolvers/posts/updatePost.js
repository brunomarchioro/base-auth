import SQL from "sql-template-strings"

export default async function updatePost(_parent, { id, ...args }, { db }) {
  await db.run(SQL`
        UPDATE posts SET
            title = ${args.title},
            content = ${args.content}
        WHERE
            id = ${id}
      `)

  return db.get(SQL`SELECT * FROM posts WHERE id = ${id}`)
}
