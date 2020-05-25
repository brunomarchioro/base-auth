import SQL from "sql-template-strings"

export default async ({ codename }, { db }) => {
  try {
    return db.all(SQL`
      SELECT * 
      FROM posts
        LEFT JOIN posts_x_scopes on posts.id = posts_x_scopes.postId
        LEFT JOIN scopes on posts_x_scopes.scopeId = scopes.id
      WHERE
        scopes.codename = ${codename}
    `)
  } catch (error) {
    console.error(error)
  }
}
