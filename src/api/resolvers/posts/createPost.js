import SQL from "sql-template-strings"

export default async function createPost(_parent, args, { db }) {
  const result = await db.run(SQL`
        INSERT INTO posts
            (title, content)
        VALUES 
            (${args.title}, ${args.content})
      `)

  return db.get(SQL`SELECT * FROM posts WHERE id = ${result.lastID}`)
}
